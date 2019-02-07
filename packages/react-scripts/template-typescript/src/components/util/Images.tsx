import * as React from "react";

const ImageLogo = (props: { style?: React.CSSProperties }) => (
    <img
        alt="Logo"
        src={require("../../assets/images/logo.webp")}
        style={props.style}
    />
);

const Images = {
    ImageLogo
};

export { Images };
