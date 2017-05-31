import * as React from "react";
import styled from "styled-components";

import * as i18n from "../i18n/util";
import * as animations from "./util/animations";
import * as CI from "./CI";
import RemoteTime from "./time/RemoteTime";

const Wrapper = styled.div`
    text-align: center;
`;

const IntroParagraph = styled.p`
    font-size: large;
`;

interface IProps { }
interface IState { }

export default class Component extends React.Component<IProps, IState> {
    render() {
        return (
            <Wrapper>
                <CI.Header>
                    <animations.InfiniteSlowSpinner>
                        <CI.Logo />
                    </animations.InfiniteSlowSpinner>
                    <h2><i18n.FormattedMessage id="main.welcomeText" /></h2>
                </CI.Header>
                <IntroParagraph>
                    <i18n.FormattedMessage
                        id="main.subText"
                        values={{ location: (<code>src/components/Main.tsx</code>) }}
                    />
                </IntroParagraph>
                <RemoteTime />
            </Wrapper>
        );
    }
}