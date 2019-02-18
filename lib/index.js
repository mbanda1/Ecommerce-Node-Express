const express = require('express');
const app=express();
const path = require('path');
 

// app.use(express.static(path.join(__dirname,'..','public')));

const categories = require('./categories');
const brands = require('./brands');
const station = require('./station');
const orders  = require('./orders');
const address = require('./address');
const users = require('./users');
const mpesa = require('./mpesa');

app.use('',categories);
app.use('', brands);
app.use('', station);
app.use('', orders);
app.use('/address', address);
app.use('/users', users);
app.use('', mpesa);

module.exports = app