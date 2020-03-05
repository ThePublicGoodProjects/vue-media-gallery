#!/usr/bin/env bash

# abort on errors
set -e

npm version minor

npm publish

