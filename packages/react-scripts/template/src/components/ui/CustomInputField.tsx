import * as mui from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import { withFormsy } from "formsy-react";
import * as React from "react";
import { IFormsyComponentProps } from "../externals/IFormsyComponentProps";

type IProps = IFormsyComponentProps & TextFieldProps & {
    showErrorOnBlurOnly: boolean;
    onBlur?(): any;
};

interface IState {
    blurred: boolean;
}

class CustomInputFieldUnwrapped extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            blurred: false
        };
    }

    changeValue = (event: any) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }

        this.props.setValue(event.target.value);
    }

    handleBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur();
        }

        this.setState({
            blurred: true
        });
    }

    handleFocus = () => {
        this.setState({
            blurred: false
        });
    }

    shouldShowError = () => {
        return !this.props.showErrorOnBlurOnly || (this.props.showErrorOnBlurOnly && this.state.blurred);
    }

    render() {
        const errorMessage = this.shouldShowError() ? this.props.getErrorMessage() : "";

        return (
            <div style={this.props.style}>
                <mui.TextField
                    label={this.props.label}
                    value={this.props.getValue() || ""}
                    onChange={(event) => { this.changeValue(event); }}
                    onBlur={() => { this.handleBlur(); }}
                    onFocus={() => { this.handleFocus(); }}
                    fullWidth
                    type={this.props.type}
                    autoComplete={this.props.autoComplete}
                    required={this.props.required}
                    error={!!errorMessage}
                    margin="dense"
                />
                <span
                    style={{
                        color: "#f00",
                        display: "block",
                        minHeight: 18,
                        width: "100%",
                        marginTop: 4,
                        marginBottom: 10,
                        fontSize: 12
                    }}
                >
                    {errorMessage}
                </span>
            </div>
        );
    }
}

const CustomInputField = withFormsy(CustomInputFieldUnwrapped);
export { CustomInputField };
