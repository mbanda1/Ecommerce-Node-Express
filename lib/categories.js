const express = require('express')
const router = express.Router()
const log = require('../tools/logger')
const DBmodel = require('./DBmodels')
var multer = require('multer')
const fs = require('fs')
const mkdirp = require('mkdirp')


const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const body = req.body
    const myDir = `./uploads/categories/${body.categoryName}`

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
    const originalname = file.originalname
    const extension = originalname.split('.')

    const filename = 'picture' + '.' + extension[extension.length - 1]

    cb(null, filename)
    log.info('File uploaded')
  }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single('categoryPicture'), async (req, res, err) => {
  try {
    if (!req.body.categoryName) {
      return res.status(400).send({ error: 'some item missing' })
    }

    let data = {
      category: req.body.categoryName,
      picture: req.file.filename
    }

    const insert = await DBmodel.insert(data, 'categoryCollection')
    if (insert.error) { res.status(400).send({ error: 'Failed inserting data' }) }
    if (insert._id) { res.status(200).send({ data }) }
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})

// get all categories
router.post('/fetch', async function (req, res) {
  try {
    const fetch = await DBmodel.fetchAll({}, 'categoryCollection', null)
    if (fetch.error) return res.status(401).send({ error: 'unauthorized to make these changez' })

    let categories = []
    fetch.forEach(data => {
      let filePath = `uploads/categories/${data.category}/${data.picture}`
      let d = []
      d.push(data), d.push({ filePath: filePath })
      categories.push(d)
    }, function () {
      res.send({ data: categories })
    })
  } catch (e) {
    log.error(e.message)
    res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
  }
})



module.exports = router
