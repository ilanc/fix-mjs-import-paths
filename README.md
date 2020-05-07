# fix-mjs-import-paths

Typescript creates extensionless import paths when using `compilerOptions.module=esnext` e.g.

- `import x from "./x"`

However esm modules require the full path i.e.

- `import x from "./x.mjs"`

There are long running threads on this here:

- https://github.com/microsoft/TypeScript/issues/18442
- https://github.com/microsoft/TypeScript/pull/35148

And you can find more on extensionless vs full paths here:

- https://nodejs.org/docs/latest-v12.x/api/esm.html#esm_terminology
- https://nodejs.org/api/esm.html#esm_resolution_algorithm

The upshot is that the esm files transpiled by typescript aren't runnable by `node --experimental-modules` because of the extensionless import paths. There is a [workaround](https://github.com/microsoft/TypeScript/issues/18442#issuecomment-581738714) but it only works for node14 (not node12 which doesn't have `--experimental-specifier-resolution=node`).

This repo contains a [jscodeshift](https://github.com/facebook/jscodeshift) AST transformer for fixing the typescript outputs. It replaces the extensionless import paths with full paths by appending ".mjs". It also fixes directory import paths and as a bonus lodash submodule imports (e.g. `lodash/merge`).

No doubt you'll need to tweak the transform rules for your code - just edit [fix-mjs-import-paths.js](./transforms/fix-mjs-import-paths.js).

## How to run the demo

```sh
git clone https://github.com/ilanc/fix-mjs-import-paths
cd fix-mjs-import-paths
npm i
./transform.sh # will transform files in ./src/fix-mjs-import-paths
git status -sb # checkout the transforms to each file
```

## How to use

You can incorporate in your project like so

- `package.json`
  ```json
  {
    "scripts": {
      "build": "build-module.sh"
    }
  }
  ```
- `build-module.sh`

  ```sh
  #!/bin/bash
  set -e
  FULLSCRIPTPATH=$(readlink --canonicalize $0) # full path, in case ./script.sh used
  BASEDIR=$(dirname $FULLSCRIPTPATH)
  cd $BASEDIR

  YELLOW='\033[1;33m'
  NC='\033[0m' # No Color

  # transpile
  printf "${YELLOW}transpile${NC}\n"
  tsc -p tsconfig.module.json

  # transform import paths
  printf "${YELLOW}transform import paths${NC}\n"
  find ./build/module -iname \*.js -exec sh -c 'mv "$1" "${1%.js}.mjs"' _ {} \;
  shopt -s globstar
  ./node_modules/.bin/jscodeshift ./build/module/**/*.mjs -t ./codemod/fix-mjs-import-paths.js
  ```

- `codemod/fix-mjs-import-paths.js`
  - copy from [fix-mjs-import-paths.js](./transforms/fix-mjs-import-paths.js)
- `tsconfig.module.json`
  ```json
  {
    "extends": "./tsconfig",
    "compilerOptions": {
      "target": "esnext",
      "outDir": "build/module",
      "module": "esnext"
    },
    "exclude": ["node_modules/**"]
  }
  ```
