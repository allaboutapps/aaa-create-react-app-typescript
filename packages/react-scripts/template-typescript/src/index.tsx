import * as React from "react";
import * as ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';

(async () => {
    
    // TLDR: Safari -.-
    // polyfill intl for browsers which have not implemented this api yet
    // will only be injected if Intl is not provided by the browser.
    // see https://github.com/andyearnshaw/Intl.js/#intljs-and-browserifywebpack
    if (!global.Intl) {
        await Promise.all([
            import("intl" as any),
            import("intl/locale-data/jsonp/en.js" as any),
            import("intl/locale-data/jsonp/de.js" as any)
        ]);
    }
    
    // Add available formattersData for this application
    // (decide which formatters are available for date-, number-, ...)
    const RI = require("react-intl");
    const formattersDataEN = require("react-intl/locale-data/en");
    const formattersDataDE = require("react-intl/locale-data/de");

    RI.addLocaleData([
        ...formattersDataEN,
        ...formattersDataDE
    ]);

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
