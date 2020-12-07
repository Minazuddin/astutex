const mongoose = require('mongoose');

//create package subscription
const subscriptionSchema = mongoose.Schema({
    title: { type: String },
    type: { type: String },
    description: { type:String },
    subscriptionId: { type: String },
    packages: []
});

//create model for subscription

module.exports = mongoose.model('Subscription', subscriptionSchema);