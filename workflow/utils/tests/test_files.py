from ..files import get_test_file


def test_get_test_file():
    assert get_test_file('project/src/some-file.py') == 'project/test/some-file.py'
