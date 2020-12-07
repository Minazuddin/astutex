const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Package = require('../model/package');
const Subscription = require('../model/subscription');
const AddOn = require('../model/addon');
const { mongo, Mongoose } = require('mongoose');
const AddOnController = require('../controller/addon');

//get all add-ons
router.get('/', AddOnController.fetchAllAddOns);

//get individual add-ons
router.get('/:id', AddOnController.fetchOneAddOn);

//create an add-ons
router.post('/', AddOnController.createAddOn);

//update an add-ons
router.patch('/:id', AddOnController.updateAddOn);

//del an add-ons
router.delete('/:id', AddOnController.deleteSingleAddOn);

//del all add-ons
router.delete('/', AddOnController.deleteAllAddOns);

module.exports = router;