/* eslint-disable no-throw-literal */

import * as Config from "../../config";
import { authStore, ICredentials } from "../stores/AuthStore";

export const STATUS_CODE_UNAUTHORIZED = 401;

// eslint-disable-next-line
function getAuthHeaders() {
    return {
        Authorization: `Bearer ${authStore.credentials && authStore.credentials.accessToken}`
    };
}

function handleUnauthorizedError(error: any): any {
    if (error.statusCode && error.statusCode === STATUS_CODE_UNAUTHORIZED) {
        authStore.logout();
    }
}

export const API = {
    async loginWithPassword(options: { username: string; password: string }): Promise<ICredentials> {
        try {
            const response = await fetch(
                `${Config.API_BASE_URL}/api/v1/auth/login`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        username: options.username,
                        password: options.password,
                        scope: "cms"
                    })
                }
            );

            if (!response.ok) {
                throw {
                    statusCode: response.status,
                    statusText: response.statusText
                };
            }

            return response.json();
        } catch (error) {
            handleUnauthorizedError(error);
            throw error;
        }
    }
};
