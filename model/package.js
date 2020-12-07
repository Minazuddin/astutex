const mongoose = require('mongoose');

//create package schema
const packageSchema = mongoose.Schema({
    title: { type: String },
    type: { type: String, required: true },
    description: { type:String },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId },
    addOnId: { type: String }
});

//create model for package

module.exports = mongoose.model('Package', packageSchema);