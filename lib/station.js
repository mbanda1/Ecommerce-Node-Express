const express = require('express');
const router = express.Router();
const Station = require('./models/station');



router.get('', function(req, res) {
  Station.find({}, function (res, data){

  })

})

 

//POST NEW LOCATION
 router.post('/station', function (req, res) {
    Station.create({
            region : req.body.region,
            location : req.body.location
         }, 
        function (err, user) {
             if(err) {res.send(err)};
             res.status(200).send(user);
        });
});



//GET ALL LOCATIONS
router.get('/station', function (req, res) {
    Station.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding stations ");
        res.status(200).send(users);
    });
});


//get by ID
router.get('/station/:id', function (req, res) {
    Station.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});



// DELETES  locatiob by id
router.delete('/station/:id', function (req, res) {
    Station.findByIdAndRemove(req.params.id, function (err, place) {
        if (err) return res.status(500).send("There was a problem removing.");
        res.status(200).send("Region: "+ place.region +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/station/:id', function (req, res) {
    Station.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send(err);
        res.status(200).send(user);
    });
});


module.exports = router;