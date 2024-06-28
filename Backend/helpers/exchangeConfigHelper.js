const ExchangeConfig = require('../model/exchangeConfigModel');
const axios = require('axios');
const crypto = require('crypto');


// ---------Fetching api key and secret from exchange config with user and exchage----------

const findExchangeConfig = async (userId, exchangeName) => {
    try {
        const config = await ExchangeConfig.findOne({ userId, exchangeName });
        if (!config) {
            throw new Error('Exchange configuration not found');
        }
        return {
            apiKey: config.apiKey,
            apiSecret: config.apiSecret,
            exchangeConfig: config._id.toString()
        };
    } catch (err) {
        console.error('Error fetching exchange configuration:', err);
        throw new Error('Internal server error');
    }
};



// ---------finding Exchange configuration by exchange id ----------------


const findExchangeConfigbyId = async (exchangeConfig) => {
    try {
        const config = await ExchangeConfig.findById({ _id: exchangeConfig });
        if (!config) {
            throw new Error('exchange configuration not found');
        }
        return {
            apiKey: config.apiKey,
            apiSecret: config.apiSecret,
        }
    } catch (error) {
        console.error("Error in fetching exchange configuration :", error);
        throw new Error("Internal server error")
    }
};

module.exports = {
    findExchangeConfig,
    findExchangeConfigbyId
};
