import * as React from "react";
import * as mui from "material-ui";
import styled from "styled-components";

import * as animations from "../util/animations";

const LoadingProgressWrapper = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(240, 240, 240, 0.4);
    position: absolute; /* positions itself absolute and wraps everything (requires a relative wrapper to be positioned within a component) */
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function LoadingProgress(props: { show: boolean }) {
    return (
        <animations.FadedTransitionGroup
            durationEnterMs={50}
            durationLeaveMs={450}
            timingFnEnter="ease-in"
            timingFnLeave="cubic-bezier(0.95, 0.05, 0.795, 0.035)"
        >
            {props.show ? (
                <LoadingProgressWrapper>
                    <mui.CircularProgress />
                </LoadingProgressWrapper>
            ) : null}
        </animations.FadedTransitionGroup>
    );
}
