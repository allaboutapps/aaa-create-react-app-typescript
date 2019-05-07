import ApolloClient from "apollo-boost";
import { ErrorResponse } from "../../node_modules/apollo-link-error";
import { authStore } from "../components/stores/AuthStore";
import * as config from "../config";

export const graphqlClient = new ApolloClient({
    uri: `${config.API_BASE_URL}/cms-api/graphql`,
    async request(operation: any) {
        // get the authentication token from local storage if it exists
        const token = authStore.credentials ? authStore.credentials.accessToken : null;

        // return the headers to the context so httpLink can read them
        operation.setContext({
            headers: {
                Authorization: token ? `Bearer ${token}` : null
            }
        });
    },
    onError(error: ErrorResponse) {
        const handled = authStore.handleGQLUnauthorized(error);
        if (!handled) {
            console.error("Unhandled GQL error", error);
        }
    }
});
