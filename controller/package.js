const mongoose = require('mongoose');
const Package = require('../model/package');
const Subscription = require('../model/subscription');
const AddOn = require('../model/addon');

exports.fetchAllPackages = (req, res) => {
    Package.find({})
    .then(async(result) => {
    res.status(200).json({
        message: 'Packages fetched',
        result: result
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.fetchOnePackage = (req, res) => {
    Package.findOne({ _id: req.params.id  })
    .then(async(result) => {
    res.status(200).json({
        message: 'Packages fetched',
        result: result
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.createPackage = async(req, res) => {
    const pack = new Package({
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        subscriptionId: new mongoose.Types.ObjectId()
    });
    pack.save()
    .then(async(result) => {
        if(result.type == 'subscription') {
            Package.find({ type: 'subscription' }).exec()
            .then(async(packages) => {
                Subscription.updateOne({ type: 'subscription' }, { $set: { packages: packages } })
                .then(() => res.status(200).json({
                    message: 'Package created',
                    package: result
                }))
            })
        } else if(result.type == 'addon') {
            Package.find({type: 'addon'}).exec()
            .then(async(packages) => {
                AddOn.updateOne({ type: 'addon' }, { $set: { packages: packages } })
                .then(() => res.status(200).json({
                    message: 'Package created',
                    package: result
                }))
            })
        }
        
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.updatePackage = async(req, res) => {
    const package = await Package.findOne({ _id: req.params.id }).exec();
    const updatedPackage = {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description
    }
    const result = Object.assign(package, updatedPackage);
    await Package.updateOne({ _id: req.params.id }, { $set: result })
    .then(async(result) => {
    res.status(200).json({
        message: 'Package Updated'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))

}

exports.deleteSinglePackage = (req, res) => {
    Package.deleteOne({ _id: req.params.id })
    .then(async(result) => {
    res.status(200).json({
        message: 'Package deleted'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.deleteAllPackages = (req, res) => {
    Package.remove({})
    .then(async(result) => {
    res.status(200).json({
        message: 'Packages deleted'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

