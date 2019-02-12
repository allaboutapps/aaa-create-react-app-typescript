const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// TODO: Set infos.
const SERVER = 'https://allaboutapps-backend-dev.allaboutapps.at';
const AUTH_EXCHANGE_ENDPOINT = SERVER + '/api/v1/auth/exchange-basic';
const USERNAME = '';
const PASSWORD = '';

(async () => {
    try {
        const res = await fetch(`${AUTH_EXCHANGE_ENDPOINT}`, {
            method: 'GET',
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer(USERNAME + ':' + PASSWORD).toString('base64'),
            },
        });

        const bearerTokenInformation = await res.json();

        console.log(`Authorization: ${bearerTokenInformation.Authorization}`);
        fs.writeFileSync(
            path.join(__dirname, '.authorization'),
            `Authorization: ${bearerTokenInformation.Authorization}`
        );
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
