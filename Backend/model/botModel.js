const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BotSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exchangeConfig: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExchangeConfig',
        required: true
    },
    botName: {
        type: String,
        required: true
    },

    category: {
        type: String
    },

    isLeverage: {
        type: String,
    }
});

const Bot = mongoose.model('Bot', BotSchema);

module.exports = Bot;
