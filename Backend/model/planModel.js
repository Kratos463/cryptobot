const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    planName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    webhookUrls: {
        type: Number,
        required: true,
    },
    exchanges: {
        type: Number,
        required: true
    },
    support: {
        type: [String],
        required: true
    }

}, {
    timestamps: true
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
