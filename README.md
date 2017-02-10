# `aaa-react-scripts-ts` [![npm version](https://badge.fury.io/js/aaa-react-scripts-ts.svg)](https://badge.fury.io/js/aaa-react-scripts-ts)

This project is a fork of [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript) further tailored to the opinionated needs of [@majodev](https://github.com/majodev) and [all about apps](https://allaboutapps.at).

## Features
* Fully configured [Visual Studio code](https://code.visualstudio.com/) environment (debugging, recommended extensions, tasks).   
* Allows to extend webpack configuration through a `webpack.js` inside the project without the need to eject.   

See the updated [README](packages/react-scripts/template/README.md) for more information on the included dependencies.

See [Forking react-scripts](https://github.com/facebookincubator/create-react-app/issues/682) for information of the forking process.

Create React apps (with Typescript) with no build configuration.

_Do you know react and want to try out typescript? Or do you know typescript and want to try out react?_ Get all the benefits from `create-react-app` but you use typescript! 🚀

## tl;dr

```sh
npm install -g create-react-app

create-react-app my-app --scripts-version=aaa-react-scripts-ts
cd my-app/
npm start
```

## Original Readme:
From [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript).

## Features

### Code highlighting on error
When you run `npm run build` the terminal will output the error, including the highlighted sourecode (like babel)! 

![CodeHighlight](https://cloud.githubusercontent.com/assets/175278/22310149/1ee66ccc-e346-11e6-83ff-e3a053701fb4.gif)

## Changelog

### 1.0.6
* Add missing `cli-highlight` dependency

### 1.0.5
* Print file names when running `npm run build`
* Add support for `setupTest.ts`
* Highlight source code when erroring in `npm run build`

### 1.0.4
* Change mentions of `eslint` to `tslint`

### 1.0.3
* Remove hidden character from `tsconfig.json`

### 1.0.2
* Copy `typescriptTransform.js` when running `npm run eject`
