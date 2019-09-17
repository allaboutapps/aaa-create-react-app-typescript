import * as React from "react";
import { t } from "../../i18n/util";

class NotFoundSite extends React.Component {
    render() {
        return (
            <h1 style={{ margin: 24, textAlign: "center" }}>
                {t("screen.not_found.title")}
            </h1>
        );
    }
}

export { NotFoundSite };
