'use strict'

const express = require('express')
const router = express.Router()
const log = require('../tools/logger')
const DBmodel = require('./DBmodels')
const ObjectId = require('mongodb').ObjectID
const { userTokenMiddleWare, decodeTheToken } = require('../tools/auth')

router.post('/insert', userTokenMiddleWare, async function (req, res) {
  try {
    const body = req.body.params
    const element = ['name', 'phone', 'address', 'region', 'location', 'thetoken']

    element.forEach(field => {
      if (!body[field]) {
        return res.status(400).send({ error: `Field ${field} required` })
      }
    })

    const auth = await decodeTheToken(body.thetoken)
    if (auth.error) return res.status(401).send({ error: 'unauthorized to make these changes' })

    const count = await DBmodel.countRecord({ owner: auth.data.id }, 'addressCollection')
    if (count.error) return res.status(401).send({ error: 'unauthorized to make these changez' })
    if (count === 5) { return res.status(400).send({ error: 'Maxmum number of records reached' }) }

    const data = {
      name: body.name,
      phone: body.phone,
      address: body.address,
      region: body.region,
      location: body.location,
      owner: auth.data.id,
      insertedOn: new Date()
    }

    const insert = await DBmodel.insert(data, 'addressCollection')
    if (insert.error) { res.status(400).send({ error: 'Failed inserting Adress' }) }
    if (insert._id) { res.status(200).send({ data }) }
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

// get all for single user
router.post('/forUser', userTokenMiddleWare, async function (req, res) {
  try {
    const thetoken = req.headers.thetoken
    if (!thetoken) return res.status(401).send({ error: 'unauthorized to obtain the address' })

    const auth = await decodeTheToken(thetoken)
    if (auth.error) return res.status(401).send({ error: 'unauthorized to make these changes' })

    const fetch = await DBmodel.fetchAll({ owner: auth.data.id }, 'addressCollection', null)
    if (fetch.error) return res.status(401).send({ error: 'unauthorized to make these changez' })

    let resultArray = []
    fetch.forEach(data => {
      resultArray.push(data)
    }, function () {
      res.send({ data: resultArray })
    })
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

// delete address
router.post('/delete', userTokenMiddleWare, async function (req, res) {
  try {
    const body = req.body.params

    if (!body.thetoken) return res.status(401).send({ error: 'unauthorized delte opperation' })
    if (!body.addressId) return res.status(400).send({ error: 'Missing Address Id' })

    const dlt = await DBmodel.deleteRecord({ '_id': ObjectId(body.addressId) }, 'addressCollection')

    if (dlt !== null) {
      if (dlt.error) return res.status(401).send({ error: 'unauthorized to make these opperation' })
      if (dlt.value !== null) {
        return res.status(200).send({ data: dlt.value })
      } else { return res.status(200).send({ error: 'No such record' }) }
    }
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

router.post('/update', userTokenMiddleWare, async function (req, res) {
  try {
    const body = req.body.params

    if (!body.addressId) return res.status(401).send({ error: 'Missing Address Id' })

    let fieldsParams = ['name', 'phone', 'address', 'region', 'location']
    fieldsParams.forEach(field => {
      if (!body[field]) {
        return res.status(401).send({ error: `Field ${field} required` })
      }
    })

    let data = {
      name: body.name,
      phone: body.phone,
      address: body.address,
      region: body.region,
      location: body.location
    }

    let response = await DBmodel.updateCollection({ _id: body.addressId }, 'addressCollection', data, false)
    return res.send({ data: response })
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

module.exports = router
