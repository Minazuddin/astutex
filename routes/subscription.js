const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Package = require('../model/package');
const Subscription = require('../model/subscription');
const AddOn = require('../model/addon');
const { mongo, Mongoose } = require('mongoose');
const subscriptionController = require('../controller/subscription');

//get all subscriptions
router.get('/', subscriptionController.getAllSubscriptions)

//get individual subscription
router.get('/:id', subscriptionController.getSingleSubscription)

//create a subscription
router.post('/', subscriptionController.createSubscription);

//update a subscription
router.patch('/:id', subscriptionController.updateSubscription);

//delete a subscription
router.delete('/:id', subscriptionController.deleteSingleSubscription)

//delete all subscription
router.delete('/', subscriptionController.deleteAllSubscriptions)

module.exports = router;