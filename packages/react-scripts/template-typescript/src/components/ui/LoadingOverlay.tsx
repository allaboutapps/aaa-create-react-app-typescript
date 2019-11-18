import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";

interface IProps {
    isVisible: boolean;
}
interface IState { }

class LoadingOverlay extends React.Component<IProps, IState> {
    render() {
        return (
            <div
                style={{
                    display: this.props.isVisible ? "flex" : "none",
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.75)",
                    alignItems: "center",
                    justifyContent: "center",
                    left: 0,
                    top: 0,
                    zIndex: 9999
                }}
            >
                <CircularProgress color="secondary" />
            </div>
        );
    }
}

export { LoadingOverlay };
