# `aaa-react-scripts-ts` [![npm version](https://badge.fury.io/js/aaa-react-scripts-ts.svg)](https://badge.fury.io/js/aaa-react-scripts-ts)

> A customized react-scripts fork for [allaboutapps](https://allaboutapps.at)

```sh
node -v
# v10.x.x
yarn create react-app --scripts-version=aaa-react-scripts-ts
```

This repo exists to patch some things in `packages/react-scripts` , however we try to track the upstream [create-react-app](https://github.com/facebook/create-react-app) repository as close as possible here (~half-yearly updates).

## Changes

- We strive to support Visual Studio Code as much as possible
- TypeScript is our language of choice, any projects are scaffolded as if the `--typescript` option was given
- GraphQL / Apollo webpack/scripts support
- Easy overwrite of webpack configurations through a local `webpack.js` file in the project
- Automatically installs compatible versions of popular libraries within our organization, e.g.
- Support for compile-time safe i18n through customized typings and utils in the projects
- Sample Login-Page in the frontend code

## Semver

Starting with `aaa-react-scripts-ts@v3` which is based on `react-scripts@v2` we track the upstream repository through meta tags in the package version.

Format: `<MAJOR>.<MINOR>.<PATCH>+cra-v<CRAMAJOR>.<CRAMINOR>.<CRAPATCH>`

E.g.: `3.0.0+cra-v2.1.3`.

Major CRA updates will also result in a bump of `aaa-react-scripts-ts`.

### Publishing

```sh

pwd
# ~/aaa-create-react-app-typescript

# Ensure everything builds in the CI as expected, you can also test locally:
yarn
lerna bootstrap

# also test locally
yarn create-react-app my-app-xxx
cd my-app-xxx

# Everything works as expected?

# create a new git tag - e.g.
git tag -a 3.0.0+cra-v2.1.5 -m "aaa-react-scripts-ts@v3.0.0 forked at create-react-app@v2.1.5"

git push origin-atl 3.0.0+cra-v2.1.5
git push origin-github 3.0.0+cra-v2.1.5

cd packages/react-scripts

nvmrc # ensure you use the right npm registry!

# finally run publish!
npm publish

```
