'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sessionKey } = require('../config/config')
const jwtSecret = require('../config/jwtSecret')




let auth = {

  signSession: (user) => {
    user.time = new Date().toISOString();
    let token = jwt.sign({ data: user }, jwtSecret, { expiresIn: '24h' });

    user.thetoken = token;
    return user;
  },


  userTokenMiddleWare: async (req, res, next) => {
    let token = req.headers.thetoken || ''

    jwt.verify(token, jwtSecret, function (e, data) {
      if (e) {
        res.status(401).send({ error: 'unauthorized to access this resource' })
      }
      else {
        req.user = data.data;
        next()
      }
    });
  },

  decodeTheToken: async (theToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(theToken, jwtSecret, function (e, data) {
        if (e) reject({ error: e })
        else resolve(data);
      });
    }).catch(e => e)

  },

}

module.exports = auth;