import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import * as i18n from "../../i18n/util";
import { NotFoundSite } from "../sites/NotFoundSite";
import { Routes } from "./Routes";

type IProps = i18n.InjectedIntlProps;

@i18n.injectIntl
@observer
class DashboardRouter extends React.Component<IProps> {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path={Routes.DASHBOARD.ROOT} component={() => { return <h1>Welcome to the dashboard!</h1>; }} />
                    <Route component={NotFoundSite} />
                </Switch>
            </>
        );
    }
}

export { DashboardRouter };
