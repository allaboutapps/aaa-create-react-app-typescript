import * as React from "react";
import styled, { keyframes } from "styled-components";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import { IntlProvider } from "react-intl";

import Main from "./components/Main";
import baseLocale from "./i18n/en";

// Needed for onTouchTap click handlers 
// see http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component<null, null> {
    render() {
        return (
            <IntlProvider locale="en" messages={baseLocale}>
                <Main />
            </IntlProvider>
        );
    }
}

export default App;
