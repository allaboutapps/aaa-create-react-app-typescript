import * as React from "react";
import styled from "styled-components";

interface IAnimatableProps {
    durationMs: number;
    animateOnMount?: boolean; // defaults to false if not specified
    // linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit;
    timingFn?: string; // defaults to linear if not specified
}

// generic helper auto executed or imperatively triggerable animations
// must be composed from a styled-component to be useable
export class Animatable extends React.Component<IAnimatableProps & {
    className?: string; // injected by styled-components
}, { isExecuting: boolean }> {

    static defaultProps = {
        timingFn: "linear",
        animateOnMount: false
    };

    animationTimeout: NodeJS.Timer | null = null;

    constructor(props: IAnimatableProps) {
        super(props);

        this.state = {
            isExecuting: false
        };
    }

    trigger = () => {

        if (this.state.isExecuting === true) {
            return;
        }

        this.setState({
            isExecuting: true
        });


        this.animationTimeout = setTimeout(() => {
            this.setState({
                isExecuting: false
            });
        }, this.props.durationMs) as any; // fixes weird error TS2322: Type 'number' is not assignable to type 'Timer | null'.
    }

    componentDidMount() {
        if (this.props.animateOnMount) {
            this.setState({
                isExecuting: true
            });
        }
    }

    componentWillUnmount() {
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
    }

    render() {
        return (
            <div className={this.state.isExecuting ? this.props.className : ""}>
                {this.props.children}
            </div>
        );
    }

}

export default function createAnimatable(keyframes: string): React.ComponentClass<IAnimatableProps & { innerRef?: (c: Animatable) => void }> {
    const anim = styled(Animatable as any) `
        animation: ${keyframes} ${(props: any) => props.durationMs}ms ${(props: any) => props.timingFn ? props.timingFn : ""};
        animation-fill-mode: both;
    `;

    return anim as any;
} 