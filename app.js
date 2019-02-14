'use strict';

const express = require('express');
const log = require('./tools/logger')
const bodyParser = require('body-parser');
const db = require('./db')
//midleware
const catchErrors = require('./middleware/catchErrors')
const { preJson } = require('./middleware/pre')


const categoryControllers = require('./lib/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const envs = ['production', 'development', 'test'];
if (envs.indexOf(process.env.NODE_ENV) < 0) {
  throw new Error({ 'Environment error': 'Env not set' });
}

app.get('/', (req, res) => {
  res.send({ status: 'Online', hey: req.protocol + '://' + req.get('host') + req.originalUrl });
});

app.use('/', preJson, categoryControllers);

db.init(function (error) {
  if (error)
    throw error;
  log.fail('Database connection Fail !')

});

// error handler
app.use(catchErrors)

app.listen(process.env.NODE.ENV || 3000, function (error) {
  if (error) throw error;
  log.info(`Listening on ${process.env.NODE.ENV || 3000}`);
});
