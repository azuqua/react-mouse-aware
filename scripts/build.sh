#!/bin/bash

rm -r lib
mkdir lib
node_modules/.bin/babel src --out-dir lib
