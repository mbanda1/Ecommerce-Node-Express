const express = require('express');
const router = express.Router();
const Mpesa = require('./models/mpesa');


router.post('/mpesa/:code', function (req, res, next) {

    Mpesa.find({pesaCode : req.params.code}, function (err, feedback) {
        if (err) return next(err);

        if(feedback.length < 1) {
 
    Mpesa.create({
          pesaCode : req.params.code,
          userPhone : req.body.userPhone
            
         }, 

        function (err, feedback) {
            
             if (err) return res.status(500).send(err);

            res.json(200, {error: "false", message: "You've Payed !"});
        });

    } else {
        res.json({error: "true", message: "That transaction is used Alredy !"});
    }
    });

    });


  //GET ALL ransactions
router.get('/mpesa', function (req, res) {
    Mpesa.find({}, function (err, payment) {
        if (err) return res.status(500).send("There was a problem finding orders.");
        res.status(200).send(payment);
    });
});

//get by user userPhone//get image by category name
router.get('/mpesa/:phone', function (req, res) {
   
 Mpesa.find({userPhone: req.params.phone.trim()}, function (err, payment){
         if(err){
            res.json(err.errors);
   }

   if(payment.length===0) {
      res.send("No data with That phone Number")
   }else {
    res.status(200);
    res.json(payment);
    
   }
      
 });
});  


module.exports = router;


