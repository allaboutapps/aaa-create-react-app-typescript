import * as React from "react";
import styled, { keyframes } from "styled-components";

import * as i18n from "../i18n/util";
const logo = require("../assets/logo.svg");

interface IProps { }
interface IState { }

const Wrapper = styled.div`
    text-align: center;
`;

const Header = styled.div`
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
`;

const spinKeyFrames = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const LogoSpinner = styled.img`
    animation: ${spinKeyFrames} infinite 20s linear;
    height: 80px;
`;

const IntroText = styled.p`
    font-size: large;
`;

export default class Component extends React.Component<IProps & i18n.InjectedIntlProps, IState> {
    render() {
        return (
            <Wrapper>
                <Header>
                    <LogoSpinner src={logo} />
                    <h2><i18n.FormattedMessage id="main.welcomeText" /></h2>
                </Header>
                <IntroText>
                    <i18n.FormattedMessage
                        id="main.subText"
                        values={{ location: (<code>src/components/Main.tsx</code>) }}
                    />
                    <br />
                    <br />
                    <i18n.FormattedDate
                        value={new Date()}
                        year="numeric"
                        month="long"
                        day="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                        second="2-digit"
                    />
                </IntroText>
            </Wrapper>
        );
    }
}