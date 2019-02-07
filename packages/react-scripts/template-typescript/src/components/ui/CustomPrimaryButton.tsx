import Button, { ButtonProps } from "@material-ui/core/Button";
import * as React from "react";
import { Styles } from "../util/Styles";
import { ui } from "../util/UIHelpers";

type IProps = {} & ButtonProps;
interface IState { }

class CustomPrimaryButton extends React.Component<IProps, IState> {
    render() {
        const { style, ...otherProps } = this.props;

        return (
            <Button
                variant="contained"
                style={{
                    boxShadow: "none",
                    borderRadius: 24,
                    ...style
                }}
                fullWidth={this.props.fullWidth}
                {...otherProps}
            >
                {this.props.children}
            </Button>
        );
    }
}

export { CustomPrimaryButton };
