const mongoose = require('mongoose')

const StrategySchema = new Schema({

    strategyName:
    {
        type: String,
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Strategy', StrategySchema)