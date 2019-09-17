import { MuiThemeProvider } from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { RawIntlProvider } from "react-intl";
import { AppRouter } from "./components/routers/AppRouter";
import { theme } from "./components/util/Theme";
import { intl } from "./i18n/util";
import { generalStore } from "./components/stores/GeneralStore";
import { FormValidations } from "./components/util/FormValidations";

FormValidations.addRules();

const App: React.FunctionComponent = observer(() => {
    return (
        <MuiThemeProvider theme={theme}>
            <RawIntlProvider value={intl} key={generalStore.locale}>
                <AppRouter />
            </RawIntlProvider>
        </MuiThemeProvider>
    );
});

export default App;
