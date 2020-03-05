#!/usr/bin/env bash

# abort on errors
set -e

npm version patch

git commit -m 'patch'

git push
