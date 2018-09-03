import * as React from "react";
import { ui } from "../util/UIHelpers";

interface IProps { }
interface IState { }

class NotFoundSite extends React.Component<IProps, IState> {
    render() {
        return (
            <h1 style={{ margin: 24, textAlign: "center" }}>
                {ui.__("screen.not_found.title")}
            </h1>
        );
    }
}

export { NotFoundSite };
