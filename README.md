# `aaa-react-scripts-ts` [![npm version](https://badge.fury.io/js/aaa-react-scripts-ts.svg)](https://badge.fury.io/js/aaa-react-scripts-ts)

> A customized react-scripts fork for [allaboutapps](https://allaboutapps.at)

# Create React App [![Build Status](https://dev.azure.com/facebook/create-react-app/_apis/build/status/facebook.create-react-app?branchName=master)](https://dev.azure.com/facebook/create-react-app/_build/latest?definitionId=1&branchName=master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/pulls)

Create React apps with no build configuration.

- [Creating an App](#creating-an-app) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.

Create React App works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/facebook/create-react-app/issues/new).<br>
If you have questions or need help, please ask in our [Spectrum](https://spectrum.chat/create-react-app) community.

**You’ll need to have Node 8.16.0 or Node 10.16.0 or later version on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

## Quick Overview

```sh
node -v
# v10.x.x
yarn create react-app my-app --scripts-version=aaa-react-scripts-ts
```

This repo exists to patch some things in `packages/react-scripts` , however we try to track the upstream [create-react-app](https://github.com/facebook/create-react-app) repository as close as possible here (~half-yearly updates).

## Changes

- We strive to support Visual Studio Code as much as possible
- TypeScript is our language of choice, any projects are scaffolded as if the `--typescript` option was given
- GraphQL / Apollo webpack/scripts support
- Easy overwrite of webpack configurations through a local `webpack.js` file in the project
- Automatically installs compatible versions of popular libraries within our organization
- Support for compile-time safe i18n through customized typings and utils in the projects
- Sample Login-Page in the frontend code
- `eslintrc` is overwritable and still coming with full tslint support.

## Semver

Starting with `aaa-react-scripts-ts@v3` which is based on `react-scripts@v2` we track the upstream repository through meta tags in the package version.

Format: `<MAJOR>.<MINOR>.<PATCH>+cra-v<CRAMAJOR>.<CRAMINOR>.<CRAPATCH>`

E.g.: `3.0.1+cra-v2.1.3`.
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

# ensure the version in aaa-react-script package.json is updated as expected:
cat packages/react-scripts/package.json | grep version
# "version": "3.0.1+cra-v2.1.5",

# create a new git tag - e.g.
git tag -a v3.0.1-cra-v2.1.5 -m "aaa-react-scripts-ts@v3.0.1 forked at create-react-app@v2.1.5"

git push origin-atl v3.0.1-cra-v2.1.5
git push origin-github v3.0.1-cra-v2.1.5

cd packages/react-scripts

npmrc # ensure you use the right npm registry!

# finally run publish!
npm publish

```
