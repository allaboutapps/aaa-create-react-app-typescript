import * as React from "react";
import { history } from "./history";

type IProps = {};
type IState = {
    lastLocation: any;
};

class RoutingManager extends React.Component<IProps, IState> {
    state: IState = {
        lastLocation: history.location
    };

    componentDidMount() {
        history.listen((location: any, action: any) => {
            if (location !== this.state.lastLocation) {
                console.log(`%cSwitching url to "${location.pathname}${location.search}${location.hash}" by action ${action}.`, "background: #eee; color: #666;");
                this.setState({
                    lastLocation: location
                });
            }
        });
    }

    render() {
        return (
            <>{this.props.children}</>
        );
    }
}

export { RoutingManager };
