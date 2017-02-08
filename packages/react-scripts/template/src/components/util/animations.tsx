import * as React from "react";

import styled, { keyframes } from "styled-components";
import headShakeKeyframeObject from "react-animations/lib/headShake";
import fadeInKeyframeObject from "react-animations/lib/fadeIn";
import fadeOutKeyframeObject from "react-animations/lib/fadeOut";

import createAnimatable, { Animatable as AnimatableClass } from "./Animatable";
import createAnimatableTransitionGroup from "./AnimatableTransitionGroup";

export type Animatable = AnimatableClass; // convenience exposed class (for .trigger() innerRefs to be called inside components)

// custom defined keyframes, could be exchanged with a defined animation from react-animations
const spinKeyFrames = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

// Example: directly via custom defined keyframes
export const InfiniteSlowSpinner = styled.div`
    animation: ${spinKeyFrames} infinite 20s linear;
`;

// Example: triggerable animation or animated once per mount (default false)
export const HeadShakeAnimatable = createAnimatable(keyframes`${headShakeKeyframeObject}`);

// Example: animated transition group based on mount and dismount of children components
export const FadedTransitionGroup = createAnimatableTransitionGroup(keyframes`${fadeInKeyframeObject}`, keyframes`${fadeOutKeyframeObject}`);
