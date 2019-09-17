import Button, { ButtonProps } from "@material-ui/core/Button";
import * as React from "react";

type IProps = ButtonProps;
type IState = {};

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
                {...otherProps}
            >
                {this.props.children}
            </Button>
        );
    }
}

export { CustomPrimaryButton };
