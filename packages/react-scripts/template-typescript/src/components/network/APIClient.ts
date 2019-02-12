import { APIClient, APIClientStatusCodeError, IAPIClientOptions, IAPITarget, ITypedAPITarget } from "network-stapler";
import * as Config from "../../config";
import { authStore } from "../stores/AuthStore";

const options: IAPIClientOptions = {
    baseUrl: Config.API_BASE_URL,
    throwOnErrorStatusCodes: true,
    injectHeaders: ((target: any) => {
        const headers = target.headers || {};

        if (!target.headers || !target.headers.Accept) {
            headers.Accept = "application/json";
        }

        if ((target.body instanceof FormData) === false) {
            headers["Content-Type"] = "application/json";
        }

        return {
            ...headers
        };
    })
};

class MyAPIClient {
    private readonly apiClient: APIClient;

    constructor() {
        this.apiClient = new APIClient(options);
    }

    injectAuthorization(target: any, authorized: boolean) {
        if (authorized && authStore.credentials) {
            target.headers = {
                ...target.headers,
                Authorization: `Bearer ${authStore.credentials.accessToken}`
            };
        }
    }

    async request(target: IAPITarget, authorized: boolean = false): Promise<Response> {
        this.injectAuthorization(target, authorized);

        return this.apiClient.request(target).catch(this.checkStatusCodeError);
    }

    async requestJSON(target: IAPITarget, authorized: boolean = false): Promise<object> {
        this.injectAuthorization(target, authorized);

        return this.apiClient.requestJSON(target).catch(this.checkStatusCodeError);
    }

    async requestType<T>(target: ITypedAPITarget<T>, authorized: boolean = false): Promise<T> {
        this.injectAuthorization(target, authorized);

        return this.apiClient.requestType(target).catch(this.checkStatusCodeError);
    }

    checkStatusCodeError(error: any): any {
        if (error instanceof APIClientStatusCodeError) {
            if (error.statusCode && error.statusCode === 401) {
                // unauthorize user on 401
                authStore.credentials = null;
                throw error;
            }
        }
        throw error;
    }
}

const apiClient = new MyAPIClient();
export default apiClient;
