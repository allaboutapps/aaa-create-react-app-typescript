const fetch = require('node-fetch');
const fs = require('fs');
const {
    buildClientSchema,
    introspectionQuery,
    printSchema,
} = require('graphql/utilities');
const path = require('path');
const schemaPath = path.join(__dirname, 'schema');

const SERVER = "http://10.0.0.81:8080";
const USERNAME = "admin";
const PASSWORD = "***REMOVED***";

const AUTH_EXCHANGE_SERVER = SERVER + '/api/v1/auth/exchange-basic';
const GRAPHQL_SERVER = SERVER + '/cms-api/graphql';

console.log("Fetching...");
return fetch(`${AUTH_EXCHANGE_SERVER}`, {
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + new Buffer(USERNAME + ':' + PASSWORD).toString('base64')
    }
}).then(res => res.json()).then(bearerTokenInformation => {
    console.log("Using " + bearerTokenInformation.Authorization);

    return fetch(`${GRAPHQL_SERVER}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearerTokenInformation.Authorization
        },
        body: JSON.stringify({
            'query': introspectionQuery
        }),
    })
}).then(res => res.json()).then(schemaJSON => {
    fs.writeFileSync(
        `${schemaPath}.json`,
        JSON.stringify(schemaJSON, null, 2)
    );

    console.log(`Generated ${schemaPath}.json`);

    // Save user readable type system shorthand of schema
    const graphQLSchema = buildClientSchema(schemaJSON.data);
    fs.writeFileSync(
        `${schemaPath}.gql`,
        printSchema(graphQLSchema)
    );

    console.log(`Generated ${schemaPath}.gql`);
}).then(() => {
    console.log("Exiting server...");
    process.exit(0);
}).catch(() => {
    console.error("The server is not running!");
    console.error("Please start the backend server.")
    process.exit(1);
});
