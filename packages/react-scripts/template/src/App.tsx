import * as React from "react";
import styled, { keyframes } from "styled-components";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import { IntlProvider } from "react-intl";

import muiTheme from "./muiTheme";
import baseLocale from "./i18n/en";
import Main from "./components/Main";

// Needed for onTouchTap click handlers 
// see http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component<null, null> {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <IntlProvider locale="en" messages={baseLocale}>
                    <Main />
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
