const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

require('dotenv').config();

//adding middlewares
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connecting to mongo db
const uri = `mongodb+srv://minhaj:${process.env.DB_PASSWORD}@cluster0.5wrjk.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => console.log('connected to mongodb'));

//adding routes
const packageRouter = require('./routes/package');
const subscriptionRouter = require('./routes/subscription');
const addOnRouter = require('./routes/addon');

app.use('/api/packages', packageRouter);
app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/addons', addOnRouter);

module.exports = app;