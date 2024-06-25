const asyncHandler = require('express-async-handler');
const Bot = require('../model/botModel')
const { findExchangeConfig } = require('../helpers/exchangeConfigHelper')


const CreateBot = asyncHandler(async (req, res) => {
    
    const userId = req.user.userId;

    try {
        const { botName, cryptoPair, strategy, exchangeName } = req.body;
        const { exchangeConfig } = await findExchangeConfig(userId, exchangeName)

        const newBot = new Bot({
            botName,
            exchangeConfig,
            cryptoPair,
            strategy,
            user:userId
        });

        const savedBot = await newBot.save();

        res.status(201).json(savedBot);
    } catch (error) {
        console.error('Error creating bot:', error);
        res.status(500).json({ error: 'Failed to create bot' });
    }
})

module.exports = {
    CreateBot
}