#!/bin/bash

./scripts/test.sh
./scripts/build.sh
npm version $1
git push origin master --tags
npm publish
