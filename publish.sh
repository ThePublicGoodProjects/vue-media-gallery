#!/usr/bin/env bash

# abort on errors
set -e

# build library dist
npm run build-bundle

npm publish
