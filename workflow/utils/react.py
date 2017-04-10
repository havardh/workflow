import re
import sys

import invoke

from .files import project_root


def execute(command):
    try:
        result = invoke.run(command, hide=True)
        return result.stdout
    except invoke.exceptions.UnexpectedExit:
        print("No output for '%s'" % command)
        sys.exit(1)


def find_parent(folder, name):
    result = execute("cd %s && git grep '%s' -- */src/*" % (folder, name))
    return result[0:result.index('.')]


def find_page(folder, name):
    last_name = name
    while "page" not in name:
        last_name = name
        name = find_parent(folder, name)
    return (name, last_name)


def find_imported_name(file, name):
    return execute("cat %s | grep %s" % (file, name)).split(' ')[1]


def find_path(router_file, page_name):
    lines = execute("cat %s" % router_file).split("\n")

    routes = []
    route_i = -1
    for i in range(len(lines)):
        if "Route" in lines[i] and page_name in lines[i]:
            route_i = i
            routes.append(lines[i])
            break

    indention = routes[0].index("<")

    while route_i > 10:
        if "Route" in lines[route_i]:
            if lines[route_i].index("<") < indention:
                routes.insert(0, lines[route_i])
                indention = lines[route_i].index("<")
        route_i -= 1

    route = ""
    for r in routes:
        m = re.search('path="(.*)"', r)
        route += "/" + m.group(0).replace('path="', "")[0:-1]
    return route


def find_route(file):
    print(file)
    folder = project_root(file)
    import_name = file.replace(folder + "/", "").replace(".js", "")
    (page, component) = find_page(folder, import_name)

    page_import = page[page.index("/", page.index("/") + 1) + 1:]
    router = find_parent(folder, page_import)

    router_file = folder + "/" + router + ".js"
    name = find_imported_name(router_file, page_import)

    return find_path(router_file, name)
