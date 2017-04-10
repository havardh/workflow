from ..files import test_file


def test_get_test_file():
    assert test_file('project/src/some-file.py') == 'project/test/some-file.py'
