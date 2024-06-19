const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    apiKey:
    {
        type: String,
        required: true
    },
    apiSecret:
    {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('ApiKey', apiKeySchema);
