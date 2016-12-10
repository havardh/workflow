import os

def get_test_file(file):
    return file.replace('src', 'test').replace('.js', '_tests.js')

def find_project_folder(file):
    folder = os.path.dirname(file)

    while folder != "/" and folder != "":
        if os.path.exists(folder + "/.git"):
            return folder
        else:
            folder = os.path.split(folder)[0]

    return os.path.dirname(file)
