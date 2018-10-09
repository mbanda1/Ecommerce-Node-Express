const express = require('express');
const router = express.Router();
const Address = require('./models/address');





 router.post('/address', function (req, res) {
    Address.create({
            name : req.body.name,
            phone : req.body.phone,
            address : req.body.address,
            region : req.body.region,
            location : req.body.location
         }, 
        function (err, adres) {
            if (err) return res.status(500).send(err);
            res.status(200).send(adres);
        });
});

//post basing on user Id
router.post('/address1/:Phone', function (req, res, next) {

    Address.find({userPhone : req.params.Phone}, function (err, user) {
        if (err) return next(err);

        if(user.length <= 5) {
 
    Address.create({
          userPhone:  req.params.Phone,
          //addressMain: req.body.phone
          name : req.body.name,
             phone : req.body.phone,
            address : req.body.address,
            region : req.body.region,
            location : req.body.location
         }, 
        function (err, adres) {
            
             if (err) return res.status(500).send(err);
            res.json(200, {message: "Address added !"});
        });

    } else {
        res.json({message: "Maxmum number of address reached !"});
    }
    });

    });


//GET ALL
router.get('/address', function (req, res) {
    Address.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding orders.");
        res.status(200).send(users);
    });
});


//get based on current phone
router.get('/address/:phone', function (req, res) {
   
    Address.find({userPhone: req.params.phone.trim()}, function (err, adres){
            if(err){
               res.json(err.errors);
      }
   
      if(adres.length===0) {

        res.json({error: true, message: "You got no address"});
       }else {
        res.json({error: false, address: adres});                                                        
      //  res.json(adres);
       
      }
         
    });
   });  
   

//get by ID
// router.get('/address/:id', function (req, res) {
//     Address.findById(req.params.id, function (err, adres) {
//         if (err) return res.status(500).send("There was a problem finding order.");
//         if (!adres) return res.status(404).send("No order found.");
//         res.status(200).send(adres);
//     });
// });


//delete address : send address Number NOT SESSION number
//we acquirer whole mode and delete record
  router.post('/addressdlt/:id',function(req,res,next){
  
    // Users.findById(req.params.id, function(err, user1){
 
 Address.findOne({phone: req.params.id.trim()}, function (err, user1){

  if (err)  return next(err) ;

      if(user1 !== null){  
         // JSON string is value which you get after use Stringify method
         
         const jsonString = JSON.stringify(user1);
          // Convert jsonString to object again and get message property
         const usId = JSON.parse(jsonString)._id;
  
         Address.findById({_id: usId}).remove().then(function(err, user){
        res.status(201);
       res.send("Deleted Address !");
    });

      } else {
        res.json({ message: "No user with That record !"});
    }            
     });                                                                                
});


 


module.exports = router;
