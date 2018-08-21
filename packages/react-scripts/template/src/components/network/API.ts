import { ITypedAPITarget } from "network-stapler";
import { ICredentials } from "../stores/AuthStore";

export const API = {
    refreshAccessToken(refreshtoken: string): ITypedAPITarget<ICredentials> {
        return {
            url: "api/v1/auth/token",
            method: "POST",
            body: {
                refreshToken: refreshtoken,
                grantType: "refreshToken"
            },
            parse: (json: any) => {
                return json as ICredentials;
            }
        };
    },

    loginWithPassword(username: string, password: string): ITypedAPITarget<ICredentials> {
        return {
            url: "api/v1/auth/token",
            method: "POST",
            body: {
                username,
                password,
                grantType: "password",
                scope: "cms"
            },
            parse: (json) => {
                return json as ICredentials;
            }
        };
    }
};
