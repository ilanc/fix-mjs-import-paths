#!/bin/bash
shopt -s globstar

# dry-run transform
# ./node_modules/.bin/jscodeshift ./src/fix-mjs-import-paths/**/*.mjs -t transforms/fix-mjs-import-paths.js -d -p

# do transform
./node_modules/.bin/jscodeshift ./src/fix-mjs-import-paths/**/*.mjs -t transforms/fix-mjs-import-paths.js