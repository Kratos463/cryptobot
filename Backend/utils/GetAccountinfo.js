const { RestClientV5 } = require('bybit-api');

async function getAccountInformation(apiKey, apiSecret, isTestnet = true) {
    try {
        const Client = new RestClientV5({ key: apiKey, secret: apiSecret, testnet: isTestnet });

        // Fetch account information
        const accountInfo = await Client.getQueryApiKey();

        if (accountInfo.retCode !== 0) {
            throw new Error(accountInfo.retMsg || 'Failed to fetch account information');
        }

        console.log('Account Information:', accountInfo);
        return { success: true, accountInfo };
    } catch (error) {
        console.error('Error fetching account information:', error.message);
        return { success: false, message: 'Failed to fetch account information', error: error.message };
    }
}

module.exports = {
    getAccountInformation
};
