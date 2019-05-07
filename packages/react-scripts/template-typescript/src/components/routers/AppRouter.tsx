import { observer } from "mobx-react";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, Router, Switch } from "react-router-dom";
import { graphqlClient } from "../../graphql/graphqlClient";
import * as i18n from "../../i18n/util";
import { LoginSite } from "../sites/LoginSite";
import { NotFoundSite } from "../sites/NotFoundSite";
import { generalStore } from "../stores/GeneralStore";
import { LoadingOverlay } from "../ui/LoadingOverlay";
import { FormValidations } from "../util/FormValidations";
import { ui } from "../util/UIHelpers";
import { DashboardRouter } from "./DashboardRouter";
import { history } from "./history";
import { PrivateRoute } from "./PrivateRoute";
import { Routes } from "./Routes";
import { RoutingManager } from "./RoutingManager";

type IProps = i18n.InjectedIntlProps;

@i18n.injectIntl
@observer
class AppRouter extends React.Component<IProps> {
    constructor(props: any) {
        super(props);
        ui.__ = i18n.bindStr(props.intl);
        FormValidations.addRules();
    }

    render() {
        return (
            <>
                <ApolloProvider client={graphqlClient}>
                    <Router history={history}>
                        <RoutingManager>
                            <Switch>
                                <Route exact path={Routes.ROOT} component={LoginSite} />
                                <PrivateRoute path={Routes.DASHBOARD.ROOT} component={DashboardRouter} />
                                <Route component={NotFoundSite} />
                            </Switch>
                        </RoutingManager>
                    </Router>
                    <LoadingOverlay isVisible={generalStore.isLoading} />
                </ApolloProvider>
            </>
        );
    }
}

export { AppRouter };
