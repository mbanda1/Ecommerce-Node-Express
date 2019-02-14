
'use-strict'
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Users = require('./models/users');
// const buses = db.collection('buses');
const log = require('../tools/logger');
// const { connectToServer, getDb} = require('../db/db')
const db = require('../db')
const model = require('../tools/models')
const DBmodel = require('./DBmodels')
const encypter = require('../tools/encrypter')
const { validatePhone } = require('../tools/validate')
const { signSession, userTokenMiddleWare} = require('../tools/auth')



//post new user
router.post('/insert', async (req, res, next) => {

    try {
        const body = req.body.params;

        if (!body.userPhone || !body.userPassword || !body.userFirstName || !body.userLastName || !body.userGender) {
            return res.status(400).send({ error: 'some data missing' });
        }

        for (var member in body) {
            if ((body[member]).match(/^ *$/) !== null)
                return res.status(400).send({ error: `Field ${member} cant be Empty` })
        }

        if (!validatePhone(body.userPhone)) { return res.status(400).send({ error: 'Enter proper phone number' }) }

        //check if Phone alredy exit
        const phone = await DBmodel.fetchData({ userPhone: body.userPhone }, { _id: 1 })
        if (phone.error) { res.status(400).send({ error: phone.error }) }

        if (phone._id !== null) {
            return res.status(400).send({ error: "Phone alredy registered !" })
        }

        const pass = await encypter.createHash(body.userPassword)
        if (!pass) { return res.status(400).send({ error: 'something not working' }); }

        const object = {
            userPhone: body.userPhone,
            userPassword: pass,
            userFirstName: body.userFirstName.toLowerCase(),
            userLastName: body.userLastName,
            userGender: body.userGender,
            createdOn: new Date()
        }

        const data = await DBmodel.insert(object)
        if (data.error) { res.status(400).send({ error: 'Failed operation' }) }
        if (data._id) { res.status(200).send({ data }) }
    } catch (e) {
        log.error(e.message)
        res.status(e.statusCode || 500).send({ error: 'something went wrong, Try again' })
    }
});





//get single phone (check)
router.post('/queryPhone', async (req, res) => {

    try {
        const phone = req.body.params.userPhone;

        if (!phone) { res.status(400).send({ error: 'Phone number required' }) }


        const data = await DBmodel.fetchData({ userPhone: phone }, { _id: 1, userPhone: 1 })

        if (data.error) { res.status(400).send({ error: data.error }) }

        if (data._id) {
            res.status(200).send({ data: data.userPhone })
        }


    } catch (e) {
        res.status(e.statusCode || 500).send({ error: e.message })
    }


});




//loging In
router.post('/login', async function (req, res) {

    try {
        const data = req.body.params;

        if (!data.userPhone) { return res.status(400).send({ error: 'Phone number required' }) }
        if (!data.userPassword) { return res.status(400).send({ error: 'Password required' }) }
        if (!validatePhone(data.userPhone)) { return res.status(400).send({ error: 'Enter proper phone number' }) }


        const user = await DBmodel.fetchData({ userPhone: data.userPhone }, null)
        if (user !== null) {
            if (user.error) { return res.status(400).send({ error: user.error }) }
        } else return res.status(400).send({ error: 'wrong email or phoneNo.' }) /* username not exist**/

        const validate = await encypter.validate(user.userPassword, data.userPassword)
        if (!validate) { return res.status(400).send({ error: 'wrong email or phoneNo.' }) } //** wrong password */

        const theUser = [user]
        let dt = {
            id: theUser[0]._id,
            userPhone: theUser[0].userPhone,
            userFirstName: theUser[0].userFirstName,
            userLastName: theUser[0].userLastName,
            userGender: theUser[0].userGender
        };

        theUser[0].userFirstName ? dt.userFirstName = theUser[0].userFirstName : null
        theUser[0].userLastName ? dt.userLastName = theUser[0].userLastName : null

        let session = signSession(dt)
        res.send({ data: session })


    } catch (e) {
        res.status(e.statusCode || 500).send({ error: e.message })
    }

});


//update User data (when loged In)
router.post('/update', userTokenMiddleWare, async function (req, res) {

    try{
        const data = req.body.params;

        if (!data.userPhone) { return res.status(400).send({ error: 'Phone number required' }) }
    }catch (e) {
        res.status(e.statusCode || 500).send({ error: e.message })
    }
   
});


module.exports = router;