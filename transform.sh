#!/bin/bash
shopt -s globstar

# dry-run transform
# ./node_modules/.bin/jscodeshift ./src/fix-mjs-import-paths/**/*.mjs -t transforms/fix-mjs-import-paths.js -d -p

# do transform
./node_modules/.bin/jscodeshift ./src/fix-mjs-import-paths/**/*.mjs -t transforms/fix-mjs-import-paths.js

# note:
cat << END

NOTE
----
you still need to change the .js paths to .mjs e.g. by running:
  find ./src/fix-mjs-import-paths -iname \*.js -exec sh -c 'mv "$1" "${1%.js}.mjs"' _ {} \;"

then you can run:
  node --experimental-modules src/fix-mjs-import-paths/index.mjs
  and it will work in node12+
END