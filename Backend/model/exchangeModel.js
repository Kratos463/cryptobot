const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    exchangeName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
       default:false
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;
