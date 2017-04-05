# -*- encoding: utf8 -*-
import codecs
import re
from os import path

from setuptools import setup, find_packages


def read(*parts):
    file_path = path.join(path.dirname(__file__), *parts)
    return codecs.open(file_path, encoding='utf-8').read()


version = re.search(
    r'^__version__\s*=\s*[\'"]([^\'"]*)[\'"]',
    read('workflow/__init__.py'),
    re.MULTILINE
).group(1)

setup(
    name='workflow',
    version=version,
    description='',
    long_description=read('readme.md'),
    author='Håvard Wormdal Høiby',
    author_email='',
    license='MIT',
    url='https://github.com/havardh/workflow',
    packages=find_packages(exclude=['tests', 'tests.*']),
    include_package_data=True,
    install_requires=read('requirements/base.txt').strip().split('\n'),
    entry_points={
        'console_scripts': ['workflow = workflow']
    },
    classifiers=[
        'Programming Language :: Python :: 3',
    ]
)
