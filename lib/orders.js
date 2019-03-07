
const express = require('express')
const router = express.Router()
const log = require('../tools/logger')
const DBmodel = require('./DBmodels')
const { userTokenMiddleWare, decodeTheToken } = require('../tools/auth')

router.post('/order', userTokenMiddleWare, async function (req, res) {
  try {
    const body = req.body.params

    if (!body.thetoken) { return res.send({ error: 'unauthorized opperation' }) }

    let auth = await decodeTheToken(body.thetoken)
    if (auth.error) return res.status(401).send({ error: auth.error })

    const order = ['brandId', 'category', 'name', 'image', 'pricePerItem', 'quantityPerItem', 'totalPricePerItem']
    const address = ['addressName', 'addressPhone', 'addressAddress', 'addressRegion', 'addressLocation']

    if (!body.order || !body.address) {
      return res.send({ error: 'some component missing' })
    }

    if (!(body.order instanceof Array)) { return res.send({ error: 'order should be an array' }) }

    order.forEach(field => {
      if (!body.order[field]) {
        return res.status(401).send({ error: `Field ${field} for order required` })
      }
    })
    address.forEach(field => {
      if (!body.address[field]) {
        return res.status(401).send({ error: `Field ${field} for address required` })
      }
    })

    function getRandomInt (min = 1999, max = 9999) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }

    const orderObj = {
      user: {
        userId: auth.data.id,
        orderId: getRandomInt()
      },
      address: {
        addressName: address.addressName,
        addressPhone: address.addressPhone,
        addressAddress: address.addressAddress,
        addressRegion: address.addressRegion,
        addressLocation: address.addressLocation
      },
      order: {
        category: order.category,
        brandId: order.brandId,
        name: order.name,
        image: order.image,
        pricePerItem: order.pricePerItem,
        quantityPerItem: order.quantityPerItem,
        totalPricePerItem: order.totalPricePerItem
      }
    }

    const data = await DBmodel.insert(orderObj, 'ordersCollection')
    if (data !== null) {
      if (data.error) { res.status(400).send({ error: data.error }) }
      if (data._id) { res.status(200).send({ data }) }
    }
  } catch (error) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

// geat all orders bazing on category and brand
router.post('/selectOrder', userTokenMiddleWare, async function (req, res, next) {
  try {
    const body = req.body.params

    const check = ['category', 'brandId']
    check.forEach(field => {
      if (!body.query[field]) {
        return res.status(401).send({ error: `Field ${field}  required` })
      }
    })

    const query = {
      order: {
        category: body.query.category,
        brandId: body.query.brandId
      }
    }

    const data = await DBmodel.fetchAll(query, 'ordersCollection', null)
    if (data !== null) {
      if (data.error) { res.status(400).send({ error: data.error }) }
      if (data._id) { res.status(200).send({ data }) }
    }
  } catch (error) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

module.exports = router
