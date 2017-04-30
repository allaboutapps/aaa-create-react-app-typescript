import * as React from "react";
import { CSSTransitionGroup, CSSTransitionGroupProps } from "react-transition-group";
import styled from "styled-components";

type IProps = Partial<CSSTransitionGroupProps> & {
    durationEnterMs: number;
    durationLeaveMs: number;
    // linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit;
    timingFnEnter?: string; // defaults to linear -- e.g. ease-in
    // linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit;
    timingFnLeave?: string; // defaults to linear -- e.g. cubic-bezier(0.95, 0.05, 0.795, 0.035)
    children?: React.ReactChildren;
};

export default function createAnimatableTransitionGroup(enterKeyframes: string, leaveKeyframes: string) {

    const styleName = "TransitionGroup_" + enterKeyframes + "_" + leaveKeyframes; // this is a unique hash anyways.

    const StyledCSSTransitionGroup = styled(CSSTransitionGroup) `
        .${styleName}-enter, .${styleName}-enter-active {
            animation: ${enterKeyframes} ${(props: IProps) => props.transitionEnterTimeout ? props.transitionEnterTimeout : 0}ms ${(props: any) => props["data-timingFnEnter"]};
            animation-fill-mode: both;
        }

        .${styleName}-leave, .${styleName}-leave-active {
            animation: ${leaveKeyframes} ${(props: IProps) => props.transitionLeaveTimeout ? props.transitionLeaveTimeout : 0}ms ${(props: any) => props["data-timingFnLeave"]};
            animation-fill-mode: both;
        }
    `;

    // must support https://github.com/Microsoft/TypeScript/issues/12215
    // props: React.CSSTransitionGroupProps - { transitionName: string }
    return function AnimatableTransitionGroup(props: IProps) {

        const { durationEnterMs, durationLeaveMs, ...other } = props;

        const defaults = {
            "data-timingFnEnter": other.timingFnEnter || "linear",
            "data-timingFnLeave": other.timingFnLeave || "linear",
        };

        return (
            <StyledCSSTransitionGroup
                transitionName={styleName}
                transitionEnterTimeout={durationEnterMs}
                transitionLeaveTimeout={durationLeaveMs}
                {...defaults}
            >
                {props.children}
            </StyledCSSTransitionGroup>
        );
    };
}