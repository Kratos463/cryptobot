const asyncHandler = require('express-async-handler');
const Bot = require('../model/botModel');
const { findExchangeConfig } = require('../helpers/exchangeConfigHelper');
const ExchangeConfig = require('../model/exchangeConfigModel')
const shortid = require('shortid');
const ShortIdMapping = require('../model/shortIdMapping');
const User = require('../model/userModel')



// ---------------Creating Bot---------------


const CreateBot = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    try {
        const { botName, exchangeName, category, isLeverage } = req.body;
        const { exchangeConfig } = await findExchangeConfig(userId, exchangeName);
        
        // Check if the bot name already exists for the user
        const existingBotByName = await Bot.findOne({ botName, user: userId });
        if (existingBotByName) {
            return res.status(400).json({ error: 'Bot name already exists for this user' });
        }

        // Create and save the new bot
        const newBot = new Bot({
            botName,
            category,
            exchangeConfig,
            isLeverage,
            user: userId,
        });

        const savedBot = await newBot.save();
        
        // Generate short ID and save the mapping
        const shortId = shortid.generate();
        const botId = savedBot._id;

        const shortIdMapping = new ShortIdMapping({
            shortId,
            userId,
            botId,
        });

        await shortIdMapping.save();

        // Find the user and add the bot ID to the user's model
        await User.findByIdAndUpdate(userId, {
            $push: { bots: botId }
        });

        res.status(201).json({ shortId });
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
