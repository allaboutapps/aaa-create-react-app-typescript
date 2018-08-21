import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { authStore } from "../components/stores/AuthStore";
import * as config from "../config";

const httpLink = createHttpLink({
    uri: `${config.API_BASE_URL}/cms-api/graphql`
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = authStore.credentials ? authStore.credentials.accessToken : null;

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : null
        }
    };
});

export const graphqlClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
