import * as React from "react";
import * as ReactDOM from "react-dom";

// TLDR: Safari -.- 
// polyfill intl for browsers which have not implemented this api yet
// will only be injected if Intl is not provided by the browser.
// see https://github.com/andyearnshaw/Intl.js/#intljs-and-browserifywebpack
if (!global.Intl) {
    require.ensure([
        "intl",
        "intl/locale-data/jsonp/en.js",
        "intl/locale-data/jsonp/de.js"
    ], (require) => {
        require("intl");
        require("intl/locale-data/jsonp/en.js");
        require("intl/locale-data/jsonp/de.js");
        attach();
    });
} else {
    attach();
}

function attach() {
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
        document.getElementById("root") as HTMLElement
    );
}
