import { Button } from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { t, setLocale } from "../../../i18n/util";
import { generalStore } from "../../stores/GeneralStore";
import { authStore } from "../../stores/AuthStore";
import { history } from "../../routers/history";
import { Routes } from "../../routers/Routes";

@observer
class DashboardSite extends React.Component {
    render() {
        return (
            <h1 style={{ margin: 24, textAlign: "center" }}>
                <p>{t("screen.dashboard.hello")}</p>
                <Button
                    variant="outlined"
                    onClick={() => { setLocale("de") }}
                    style={{ marginRight: 8 }}
                    disabled={generalStore.locale === "de"}
                >
                    {t("language.german")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => { setLocale("en") }}
                    disabled={generalStore.locale === "en"}
                >
                    {t("language.english")}
                </Button>
                <div>
                    <Button
                        onClick={() => {
                            authStore.logout();
                            history.push(Routes.ROOT);
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </h1>
        );
    }
}

export { DashboardSite };

