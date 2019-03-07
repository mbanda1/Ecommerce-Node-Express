const express = require('express')
const router = express.Router()
const log = require('../tools/logger')
const DBmodel = require('./DBmodels')
var multer = require('multer')
const fs = require('fs')
var mkdirp = require('mkdirp')


const { userTokenMiddleWare } = require('../tools/auth')

let storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const myDir = `./uploads/brands/${req.body.brandName}`
    fs.access(myDir, function (err) {
      if (err) {
        mkdirp(myDir, function (e) {
          if (e) throw e
        })
      }
    })
    cb(null, myDir)
  },

  filename: function (req, file, cb) {
    const myDir = `./uploads/brands/${req.body.brandName}`

    fs.access(myDir, function (err) {
      if (err) {
        mkdirp(myDir, function (e) {
          if (e) throw e
        })
      }
    })

    const originalname = file.originalname
    const extension = originalname.split('.')

    const filename = Date.now() + '_' + (Math.floor(Math.random() * 10000)) + '.' + extension[extension.length - 1]

    cb(null, filename)
  }

})

const upload = multer({ storage: storage })

router.post('/upload', userTokenMiddleWare, upload.single('brandPicture'), async (req, res) => {
  try {
    const body = req.body
    const cnt = ['brandCategory', 'brand_type', 'brandName', 'brandPrice', 'brandSpecification', 'brandDescription']
    cnt.forEach(element => {
      if(!body[element]){
        return res.status(400).send({ error: `${element} missing` })
      }
    })

    if (!body.brandName) {
      return res.status(400).send({ error: 'some item missing' })
    }

    let data = {
      brand: req.body.brandName,
      brand_type: body.brand_type,
      brandName: body.brandName,
      brandPrice: body.brandPrice,
      brandSpecification: body.brandSpecification,
      brandDescription: body.brandDescription,
      picture: req.file.filename
    }

    const insert = await DBmodel.insert(data, 'brandCollection')
    if (insert.error) { res.status(400).send({ error: 'Failed inserting data' }) }
    if (insert._id) { res.status(200).send({ data }) }
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

// get for a brands
router.post('/fetch', userTokenMiddleWare, async function (req, res) {
  try {
    let body = req.body.params.category
    if (!body) {
      return res.status(400).send({ error: 'category missing ' })
    }

    const fetch = await DBmodel.fetchAll({ category: body }, 'brandCollection', null)
    if (fetch.error) return res.status(401).send({ error: 'unauthorized to make these changez' })

    let brands = []
    fetch.forEach(data => {
      let filePath = `uploads/brands/${data.brands}/${data.picture}`
      let d = []
      d.push(data), d.push({ filePath: filePath })
      brands.push(d)
    }, function () {
      res.send({ data: brands })
    })
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})




module.exports = router
