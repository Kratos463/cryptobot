const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BotSchema = new Schema({
    botName:
    {
        type: String,
        required: true
    },
    webhookUrl:
    {
        type: String,
        required: true
    },
    exchangeConfig:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExchangeConfig',
        required: true
    },
    cryptoPair:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CryptoPair',
        required: true
    },
    strategy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Strategy',
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Bot = mongoose.model('Bot', BotSchema);

module.exports = Bot;
