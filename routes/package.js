const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Package = require('../model/package');
const Subscription = require('../model/subscription');
const AddOn = require('../model/addon');
const { mongo, Mongoose } = require('mongoose');

const PackageController = require('../controller/package')

//get all packages
router.get('/', PackageController.fetchAllPackages);

//get individual packages
router.get('/:id', PackageController.fetchOnePackage)

//create a package
router.post('/', PackageController.createPackage);

//update a package
router.patch('/:id', PackageController.updatePackage);

//delete a package
router.delete('/:id', PackageController.deleteSinglePackage)

//delete all packages
router.delete('/', PackageController.deleteAllPackages)

module.exports = router;