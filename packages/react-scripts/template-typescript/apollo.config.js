const fs = require('fs');
const path = require('path');
const AUTH_HEADER = fs
    .readFileSync(path.join(__dirname, 'graphql/.authorization'))
    .toString();

// Adapt graphql/getAuthorization.js + run "yarn gql:auth" first
module.exports = {
    client: {
        tagName: 'gql',
        includes: ['src/**/*.{ts,tsx,gql}'],
        service: {
            name: 'service',
            url:
                'https://allaboutapps-backend-dev.allaboutapps.at/cms-api/graphql',
            headers: {
                // optional
                authorization: AUTH_HEADER.split('Authorization: ')[1],
            },
            // localSchemaFile: './graphql/schema.json'
            // skipSSLValidation: true, // optional, disables SSL validation check
        },
    },
};
