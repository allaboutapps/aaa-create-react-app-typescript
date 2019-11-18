import { action, observable } from "mobx";
import { create, persist } from "mobx-persist";
import * as config from "../../config";
import { API, STATUS_CODE_UNAUTHORIZED } from "../network/API";

export interface ICredentials {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
}

export interface IProfile {
    uid: string;
    scope: string[];
    email: string;
}

export type AuthError = "PasswordWrong" | "Unknown";

class Auth {
    @persist("object") @observable credentials: ICredentials | null = null;
    @persist("object") @observable userProfile: IProfile | null = null;
    @persist @observable username = "";
    @observable error: AuthError | null = null;
    @observable isAuthenticated = false;
    @observable isLoading = false;
    @observable isRehydrated = false;
    @observable globalLegalUpdatedAt: string | null = null;

    @action loginWithPassword = async (username: string, password: string) => {
        if (this.isLoading) {
            // bailout, noop
            return;
        }

        this.isLoading = true;

        try {
            const credentials = await API.loginWithPassword({
                username: username,
                password: password
            });

            this.error = null;
            this.username = username;
            this.isLoading = false;
            this.credentials = credentials;

            // This has to be last! Because setting isAuthenticated to true triggers the <PublicRoute> component
            // to start redirecting in which case the credentials must be valid.
            this.isAuthenticated = true;
        } catch (error) {
            this.isLoading = false;

            if (error.statusCode === STATUS_CODE_UNAUTHORIZED) {
                this.wipe("PasswordWrong");
            } else {
                this.wipe("Unknown");
            }
        }
    }

    @action logout() {
        this.wipe(null);
    }

    @action tokenExchange = async () => {
        this.isLoading = true;

        try {
            if (this.credentials === null) {
                throw new Error(`No valid credentials are available`);
            }

            const res = await fetch(`${config.API_BASE_URL}/api/v1/auth/refresh`, {
                method: "POST",
                body: JSON.stringify({
                    refreshToken: this.credentials.refreshToken
                })
            });

            if (!res.ok) {
                throw Error(`${res.status}: ${res.statusText}`);
            }

            const { accessToken, refreshToken, expiresIn, tokenType } = await res.json();

            this.credentials = {
                accessToken,
                refreshToken,
                expiresIn,
                tokenType
            };
            this.error = null;
            this.isAuthenticated = true;
            this.isLoading = false;
        } catch (e) {
            this.wipe("Unknown");
        }
    }

    @action handleGQLUnauthorized = async (error: any) => {
        if (error &&
            error.networkError &&
            error.networkError.statusCode === STATUS_CODE_UNAUTHORIZED
        ) {
            if (this.credentials) {
                try {
                    await this.tokenExchange();
                } catch {
                    this.wipe(null);
                }
            } else {
                this.wipe(null);
            }

            return true;
        }

        return false;
    }

    @action private wipe(error: AuthError | null) {
        this.credentials = null;
        this.error = error;
        this.isAuthenticated = false;
        this.isLoading = false;
        this.userProfile = null;
    }
}

let authStore: Auth;
if (process.env.NODE_ENV === "test") {
    class MockAuth {
        @observable credentials: any = null;
        @observable isAuthenticated = false;
        @observable error: any = null;
        @observable isRehydrated = true;

        @action loginWithPassword = () => undefined;
        @action dismissError = () => undefined;
        @action logout = () => undefined;
    }

    authStore = (new MockAuth()) as any; // no localstorage support in node env
} else {
    // persist this mobx state through localforage
    const hydrate = create({
        storage: require("localforage")
    });
    authStore = new Auth();

    hydrate("auth", authStore).then(() => {
        // trigger token exchange if credentials are available...
        if (authStore.credentials !== null) {
            console.log("hydrate.auth: credentials are available, awaiting new token...");
            authStore.tokenExchange().then(() => {
                console.log("hydrate.auth: received new token!");
                authStore.isRehydrated = true;
            }).catch(() => {
                console.log("hydrate.auth: failed to receive new token!");
                authStore.isRehydrated = true;
            });
        } else {
            authStore.isRehydrated = true;
            console.log("rehydrated, no credentials are available.");
        }
    }).catch((error) => {
        console.error(error);
    });
}

// development, make auth available on window object...
(window as any).auth = authStore;

// singleton, exposes an instance by default
export { authStore };
