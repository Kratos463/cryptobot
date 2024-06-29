const mongoose = require('mongoose');

const shortIdMappingSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    botId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bot',
        required: true,
    },
});

const ShortIdMapping = mongoose.model('ShortIdMapping', shortIdMappingSchema);

module.exports = ShortIdMapping;
