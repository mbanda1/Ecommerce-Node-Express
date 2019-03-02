const express = require('express');
const router = express.Router();
const DBmodel = require('./DBmodels');
const log = require('../tools/logger');
const { signSession, userTokenMiddleWare, decodeTheToken } = require('../tools/auth')


//POST NEW LOCATION
router.post('/insert', userTokenMiddleWare, async function (req, res) {
    try {
        const body = req.body.params;

        if (!body['region']) {
            return res.send({ error: `element region required` });
        } if (!body['location']) {
            return res.send({ error: `element location required` });
        }

        const data = {
            region: body.region,
            location: [body.location]
        }

        const insert = await DBmodel.insert(data, 'stationCollection')
        if (insert.error) { res.status(400).send({ error: insert.error }) }
        if (insert._id) { res.status(200).send({ data }) }

    } catch (e) {
        log.error(e.message)
        res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
    }

});





//get by ID
router.post('/fetch', userTokenMiddleWare, async function (req, res) {
    try {
       const config = req.body.params;
       if(!config.id) {res.send({config: 'Id missing !'})}

       const fetch = await DBmodel.fetchAll({ _id: '' }, 'stationCollection', null);
       if (fetch.error) return res.status(401).send({ error: fetch.error })

       let resultArray = [];
        fetch.forEach(data => {
            resultArray.push(data)
        }, function () {
            res.send({ data: resultArray })
        });


    } catch (e) {
        log.error(e.message)
        res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
    }
});



module.exports = router;