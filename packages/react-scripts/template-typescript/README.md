# aaa-react-scripts-ts

Customized react template project generator for [at all about apps](https://allaboutapps.at) using the current default settings.

## Typical additional dependencies at all about apps

- [`material-ui`](https://npmjs.org/package/material-ui)
- [`react-intl`](https://npmjs.org/package/react-intl)
  - A custom `@types/react-intl` is supplied in generated projects that introduces the generic IDS to check used i18n keys during compile time
- [`intl`](https://npmjs.org/package/intl) (Polyfill for safari, only loaded if required)
- [`styled-components`](https://npmjs.org/package/styled-components)
- [`lodash`](https://npmjs.org/package/lodash)
- [`hoist-non-react-statics`](https://npmjs.org/package/hoist-non-react-statics) (If you write your own Higher Order Components)
- [`formsy-react`](https://npmjs.org/package/formsy-react)
- [`mobx`](https://npmjs.org/package/mobx) + [`mobx-react`](https://npmjs.org/package/mobx-react) + [`mobx-persist`](https://npmjs.org/package/mobx-persist) + [`localforage`](https://npmjs.org/package/localforage)
- [`react-router`](https://npmjs.org/package/react-router)
- [`apollo-client`](https://npmjs.org/package/apollo-client) + [`graphql-tag`](https://npmjs.org/package/graphql-tag) + [`apollo-cli`](https://www.npmjs.com/package/apollo)

## Original readmes

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
