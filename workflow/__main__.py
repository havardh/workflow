import argparse

from .main import run

parser = argparse.ArgumentParser(description="Script for opening advisor:unit-testing")
parser.add_argument("config_file", metavar='config_file')
parser.add_argument("file", metavar='file')
args = parser.parse_args()

run(args.config_file, args.file)
