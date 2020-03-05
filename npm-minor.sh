#!/usr/bin/env bash

# abort on errors
set -e

npm version minor

git commit -m 'minor version update'

git push
