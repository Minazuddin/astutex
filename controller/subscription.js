const mongoose = require('mongoose');
const Subscription = require('../model/subscription');

exports.getAllSubscriptions = (req, res) => {
    Subscription.find({})
    .then(async(result) => {
    res.status(200).json({
        message: 'Subscriptions fetched',
        result: result
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.getSingleSubscription = (req, res) => {
    Subscription.findOne({ _id: req.params.id  })
    .then(async(result) => {
    res.status(200).json({
        message: 'Subscription fetched',
        result: result
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.createSubscription = async(req, res) => {
    const sub = new Subscription({
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        subscriptionId: new mongoose.Types.ObjectId()
    });
    sub.save()
    .then(async(result) => {
        res.status(200).json({
            message: 'Subscription created',
            package: result
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.updateSubscription = async(req, res) => {
    const sub = await Subscription.findOne({ _id: req.params.id }).exec();
    const updatedSub = {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description
    }
    const result = Object.assign(sub, updatedSub);
    await Subscription.updateOne({ _id: req.params.id }, { $set: result })
    .then(async(result) => {
    res.status(200).json({
        message: 'Subscription Updated'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))

}

exports.deleteSingleSubscription = (req, res) => {
    Subscription.deleteOne({ _id: req.params.id })
    .then(async(result) => {
    res.status(200).json({
        message: 'Subscription deleted'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

exports.deleteAllSubscriptions = (req, res) => {
    Subscription.remove({})
    .then(async(result) => {
    res.status(200).json({
        message: 'Subscriptions deleted'
        })
    })
    .catch(err => res.status(500).json({
        message: `Error --- ${err}`
    }))
}

