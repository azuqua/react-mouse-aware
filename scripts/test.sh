#!/bin/bash

echo "linting..."
./node_modules/.bin/eslint src || exit 1

echo "testing..."
./node_modules/.bin/mocha ./test        \
    --require babel-register            \
    --require test/setup                \
    --check-leaks                       \
    --throw-deprecation || exit 1

echo "done."
exit 0
