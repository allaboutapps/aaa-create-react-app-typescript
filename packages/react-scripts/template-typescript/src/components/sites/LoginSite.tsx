import * as Formsy from "formsy-react";
import { observer } from "mobx-react";
import * as React from "react";
import { Routes } from "../routers/Routes";
import { authStore } from "../stores/AuthStore";
import { generalStore } from "../stores/GeneralStore";
import { CustomInputField } from "../ui/CustomInputField";
import { Images } from "../util/Images";
import { t } from "../../i18n/util";
import { history } from "../routers/history";
import Button from "@material-ui/core/Button";

type IProps = {};
type IState = {
    canSubmit: boolean;
    error: string;
}

interface ILoginValues {
    email: string;
    password: string;
}

@observer
class LoginSite extends React.Component<IProps, IState> {
    state: IState = {
        canSubmit: false,
        error: ""
    }

    componentDidUpdate() {
        if (authStore.isAuthenticated) {
            history.push(Routes.DASHBOARD.ROOT);
        }
    }

    submit = async (model: ILoginValues) => {
        generalStore.isLoading = true;
        this.setState({ error: "" });

        try {
            await authStore.loginWithPassword(model.email, model.password);
            if (authStore.error) {
                if (authStore.error === "PasswordWrong") {
                    this.setState({ error: t("screen.login.invalid_password_or_email") });
                } else if (authStore.error === "Unknown") {
                    this.setState({ error: t("screen.login.error_during_login") });
                }
            } else {
                history.push(Routes.DASHBOARD.ROOT);
            }
        } catch (error) {
            this.setState({ error: t("screen.login.error_during_login") });
        }

        generalStore.isLoading = false;
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    }

    render() {
        if (!authStore.isRehydrated) {
            return null;
        }

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 0%",
                    padding: 24
                }}
            >
                <Images.ImageLogo style={{ maxWidth: 200 }} />
                <div
                    style={{
                        background: "#fff",
                        borderRadius: 4,
                        width: "100%",
                        maxWidth: 320,
                        marginTop: 40
                    }}
                >
                    <div
                        style={{
                            background: "rgb(253, 128, 72)",
                            color: "#fff",
                            textTransform: "uppercase",
                            padding: 24,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                            fontWeight: "bold"
                        }}
                    >
                        {t("screen.login.title")}
                    </div>
                    <div style={{ padding: 24, border: "1px solid rgb(253, 128, 72)" }}>
                        <Formsy.default
                            onValidSubmit={this.submit}
                            onValid={this.enableButton}
                            onInvalid={this.disableButton}
                        >
                            <CustomInputField
                                name="email"
                                label={t("screen.login.form.email.label")}
                                type="email"
                                required
                                autoComplete="username"
                                validations="isEmail"
                                validationError={t("screen.login.form.email.validation_error")}
                                showErrorOnBlurOnly
                            />

                            <CustomInputField
                                name="password"
                                label={t("screen.login.form.password.label")}
                                type="password"
                                required
                                autoComplete="current-password"
                                validations="minLength:6"
                                validationError={t("screen.login.form.password.validation_error")}
                            />

                            {this.state.error && <div style={{ color: "#f00", fontSize: 14 }}>
                                {this.state.error}
                            </div>
                            }

                            <Button
                                variant="contained"
                                style={{
                                    boxShadow: "none",
                                    borderRadius: 24,
                                    marginTop: 24
                                }}
                                fullWidth disabled={!this.state.canSubmit}
                                type="submit"
                            >
                                {t("screen.login.form.submit")}
                            </Button>
                        </Formsy.default>
                    </div>
                </div>
            </div>
        );
    }
}

export { LoginSite };
