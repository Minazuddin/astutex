const mongoose = require('mongoose');

//create addOn schema
const addOnSchema = mongoose.Schema({
    subscriptionId: { type: mongoose.Schema.Types.ObjectId },
    addOnId: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    type: { type: String },
    packages: []
});

//create model for addOn

module.exports = mongoose.model('AddOn', addOnSchema);