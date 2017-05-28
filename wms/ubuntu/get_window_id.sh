#!/bin/bash

wmctrl -l -p | grep $1 | awk '{ print $1 }'
