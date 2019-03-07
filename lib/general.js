
const express = require('express')
const router = express.Router()
const log = require('../tools/logger')
const path = require('path')

router.get('/fetchImg', function (req, res) {
    try {
        const params = req.params;
        if(params.model !== 'categories' || params.model !== 'brands');

        const filePath = req.body.params.filePath
        if (!filePath) {
            return res.status(400).send({ error: 'filePath missing' })
        }

        res.sendFile(path.join(__dirname, `../${filePath}`))
    } catch (e) {
        log.error(e.message)
        res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
    }
})

module.exports = router;
