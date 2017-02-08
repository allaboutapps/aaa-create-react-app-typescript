import * as React from "react";
import styled from "styled-components";

// TODO: exchange with all about apps logo
export const Logo = () => (
    <img src={require("../assets/logo.svg")} height="80px" />
);

export const Header = styled.div`
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
`;