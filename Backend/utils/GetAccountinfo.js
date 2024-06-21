const { RestClientV5 } = require('bybit-api');

 // Set to true for mainnet, false for testnet

async function getAccountInformation(apiKey, apiSecret) {
    try {
        const Client = new RestClientV5({ key: apiKey, secret: apiSecret,  testnet: true});

        // Fetch account information
        const accountInfo = await Client.getQueryApiKey();

        console.log('Account Information:', accountInfo);
        return { success: true, accountInfo };
    } catch (error) {
        console.error('Error fetching account information:', error);
        return { success: false, message: 'Failed to fetch account information', error: error.message };
    }
}

module.exports = {
    getAccountInformation
};
