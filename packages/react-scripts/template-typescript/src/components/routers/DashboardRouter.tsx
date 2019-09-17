import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { NotFoundSite } from "../sites/NotFoundSite";
import { Routes } from "./Routes";
import { DashboardSite } from "../sites/dashboard/DashboardSite";

@observer
class DashboardRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path={Routes.DASHBOARD.ROOT} component={DashboardSite} />
                <Route component={NotFoundSite} />
            </Switch>
        );
    }
}

export { DashboardRouter };
