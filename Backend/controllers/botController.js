const asyncHandler = require('express-async-handler');
const Bot = require('../model/botModel');
const { findExchangeConfig } = require('../helpers/exchangeConfigHelper');
const ExchangeConfig = require('../model/exchangeConfigModel')


// ---------------Creating Bot---------------

const CreateBot = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    try {

        const { botName, exchangeName } = req.body;
        const { exchangeConfig } = await findExchangeConfig(userId, exchangeName);

        const existingBotByName = await Bot.findOne({ botName, user: userId });
        if (existingBotByName) {
            return res.status(400).json({ error: 'Bot name already exists for this user' });
        }

        const newBot = new Bot({
            botName,
            exchangeConfig,
            user: userId,
        });

        const savedBot = await newBot.save();

        res.status(201).json(savedBot);
    } catch (error) {
        console.error('Error creating bot:', error);
        res.status(500).json({ error: 'Failed to create bot' });
    }
});

// -----------Get Bots list------------

const getBots = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    try {
        const bots = await Bot.find({ user: userId }).lean();

        // Fetch the exchange names for each bot
        const botsWithExchangeNames = await Promise.all(bots.map(async (bot) => {
            const exchangeConfig = await ExchangeConfig.findOne({ userId, _id: bot.exchangeConfig }).lean();
            return {
                ...bot,
                exchangeName: exchangeConfig ? exchangeConfig.exchangeName : 'Unknown',
            };
        }));

        res.json(botsWithExchangeNames);
    } catch (error) {
        console.error('Error fetching bots:', error);
        res.status(500).json({ error: 'Failed to fetch bots' });
    }
});

module.exports = {
    CreateBot,
    getBots
};
