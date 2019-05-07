import * as React from "react";

type IProps = {
    children: any;
    focusOnUpdate?: boolean;
};

/**
 * Automatically focus the child element.
 */
export class A11yFocus extends React.Component<IProps> {
    ref: any;

    componentDidMount() {
        if (this.ref) {
            this.ref.focus();
        }
    }

    componentDidUpdate() {
        if (this.ref && this.props.focusOnUpdate) {
            this.ref.focus();
        }
    }

    render() {
        return (
            <div
                style={{ outline: "none" }}
                tabIndex={-1}
                ref={(c: any) => this.ref = c}
            >
                {...this.props.children}
            </div>
        );
    }
}
