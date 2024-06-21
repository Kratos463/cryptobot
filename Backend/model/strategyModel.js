const mongoose = require('mongoose')

const StrategySchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    botId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bot',
        required: true
    },
    strategyType: {
        type: String,
        enum: ['Spot', 'Futures'],
        required: true
    },
    leverage: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Strategy', StrategySchema)