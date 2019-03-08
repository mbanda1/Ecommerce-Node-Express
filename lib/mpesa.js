'use strict'

const express = require('express')
const router = express.Router()
const log = require('../tools/logger')
const DBmodel = require('./DBmodels')
const { signSession, userTokenMiddleWare, decodeTheToken } = require('../tools/auth')

router.post('/insert', userTokenMiddleWare, async function (req, res) {
  try {
    const body = req.body.params

    if (!body.pesaCode) {
      return res.status(400).send({ error: `Field pesaCode required` })
    }

    const auth = await decodeTheToken(req.headers.thetoken)
    if (auth.error) return res.status(401).send({ error: 'unauthorized to make these changes' })

    const count = await DBmodel.countRecord({ pesaCode: body.pesaCode }, 'mpesaCollection')
    if (count.error) return res.status(401).send({ error: 'unauthorized to make these changez' })
    if (count !== 0) { return res.status(400).send({ error: 'Used or Wrong code' }) }

    const data = {
      pesaCode: body.pesaCode,
      userPhone: auth.data.userPhone
    }

    const insert = await DBmodel.insert(data, 'mpesaCollection')
    if (insert.error) { res.status(400).send({ error: 'Failed sending code' }) }
    if (insert._id) { res.status(200).send({ data }) }
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

module.exports = router
