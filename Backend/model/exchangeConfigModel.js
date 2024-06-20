const mongoose = require('mongoose');

const exchangeConfig = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exchangeName:{
        type:String,
        required:true
    },
    apiKey:{
        type: String,
        required: true
    },
    apiSecret:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('ExchangeConfig', exchangeConfig);
