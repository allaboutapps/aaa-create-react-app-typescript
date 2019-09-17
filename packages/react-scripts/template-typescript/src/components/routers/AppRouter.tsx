import { observer } from "mobx-react";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, Router, Switch } from "react-router-dom";
import { graphqlClient } from "../../graphql/graphqlClient";
import { LoginSite } from "../sites/LoginSite";
import { NotFoundSite } from "../sites/NotFoundSite";
import { generalStore } from "../stores/GeneralStore";
import { LoadingOverlay } from "../ui/LoadingOverlay";
import { DashboardRouter } from "./DashboardRouter";
import { history } from "./history";
import { PrivateRoute } from "./PrivateRoute";
import { Routes } from "./Routes";
import { RoutingManager } from "./RoutingManager";

@observer
class AppRouter extends React.Component {
    render() {
        return (
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
        );
    }
}

export { AppRouter };
