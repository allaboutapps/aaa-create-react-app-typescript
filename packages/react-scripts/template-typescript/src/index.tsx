import * as React from "react";
import * as ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// tslint:disable-next-line:no-floating-promises
(async () => {
    // Polyfill "Intl.PluralRules"
    // https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-to-using-native-intl-apis
    if (!Intl.PluralRules) {
        require('@formatjs/intl-pluralrules/polyfill-locales');
    }

    // Polyfill "Intl.PluralRules"
    // https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-to-using-native-intl-apis
    if (!Intl.RelativeTimeFormat) {
        require('@formatjs/intl-relativetimeformat/polyfill-locales');
    }

    const App = require("./App").default;
    require("./index.css");

    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
})();
