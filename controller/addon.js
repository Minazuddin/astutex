const mongoose = require('mongoose');
const AddOn = require('../model/addon');

exports.fetchAllAddOns = (req, res) => {
    AddOn.find({})
    .then(async(result) => {
    res.status(200).json({
        message: 'AddOn fetched',
        result: result
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.fetchOneAddOn = (req, res) => {
    AddOn.findOne({ _id: req.params.id  })
    .then(async(result) => {
    res.status(200).json({
        message: 'AddOn fetched',
        result: result
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.createAddOn = async(req, res) => {
    const addon = new AddOn({
        title: req.body.title,
        type: req.body.type,
        subscriptionId: new mongoose.Types.ObjectId(),
        addOnId: new mongoose.Types.ObjectId(),
        packages: []
    });
    addon.save()
    .then(async(result) => {
        res.status(200).json({
            message: 'AddOn created',
            package: result
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.updateAddOn = async(req, res) => {
    const package = await AddOn.findOne({ _id: req.params.id }).exec();
    const updatedPackage = {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description
    }
    const result = Object.assign(package, updatedPackage);
    await AddOn.updateOne({ _id: req.params.id }, { $set: result })
    .then(async(result) => {
    res.status(200).json({
        message: 'AddOn Updated'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.deleteSingleAddOn = (req, res) => {
    AddOn.deleteOne({ _id: req.params.id })
    .then(async(result) => {
    res.status(200).json({
        message: 'AddOn deleted'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.deleteAllAddOns = (req, res) => {
    AddOn.remove({  })
    .then(async(result) => {
    res.status(200).json({
        message: 'AddOns deleted'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

