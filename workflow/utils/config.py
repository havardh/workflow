from ..utils.files import project_root, test_file
from ..utils.react import find_route


def advisor_url(file):
    return "http://localhost:9090/advisor/advisor/#" + find_route(file).replace(":caseRef", "1")


util_funtions = {
    "project_root": project_root,
    "test_file": test_file,
    "advisor_url": advisor_url
}


def parse_field(field, args):
    if field[0] == "$":
        if field[1:] in args:
            return args[field[1:]]
        else:
            context = {}
            context.update(args)
            context.update(util_funtions)
            return eval(field[1:], context)
    else:
        return field
