const mongoose = require('mongoose');

const CryptoPairSchema = new Schema({

    pairName:
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
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Cryptopair', CryptoPairSchema)