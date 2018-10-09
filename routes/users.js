var express = require('express');
var router = express.Router();
const Users = require('./models/users');
const mongoose = require('mongoose'); 



//post new user
router.post('/users', function(req, res, next) {
     var post= new Users();
 
    if(req.body.userPhone){
     if(req.body.userPhone.trim()!==""){
    post.userPhone=req.body.userPhone.trim();}
        };


    if(req.body.userPassword){
     if(req.body.userPassword.trim()!==""){
    post.userPassword=req.body.userPassword.trim();}
        };


    if(req.body.userGender){
     if(req.body.userGender.trim()!==""){
    post.userGender=req.body.userGender.trim();}
        };

   if(req.body.userFirstName){
     if(req.body.userFirstName.trim()!==""){
    post.userFirstName=req.body.userFirstName.trim();}
        };


        if(req.body.userLastName){
     if(req.body.userLastName.trim()!==""){
    post.userLastName=req.body.userLastName.trim();}
        };

  //check phone No. duplication
        Users.find({userPhone : post.userPhone}, function (err, user) {
        	       if (err) return next(err);

        if (user.length !== 0){
    	   	res.json(500, {message: "User alredy exists"});
         }else{
             post.save(function(err,user){
          	res.json(200, {message: "Users Created !"});
    });
 
        }
    });
        

       
});


//get single phone (check)
router.get('/users/:phone', function (req, res, next) {
Users.findOne({userPhone: req.params.phone.trim()}, function (err, user){
   //       if(err){
   //          res.json(err.errors);
   // }
         if (err) return next(err);

       if(user == null) { 

    	   	res.json({message: "false"});

                } else {
    	   	res.json(200, {message: "true", user: user});
       }
   });

});



router.get('/users', function (req, res, next) {
    Users.find({}, function (err, user) {
        if (err) return next(err);
        res.status(201);
        res.json(user);
    });
});


 //delete
  router.delete('/users/:id',function(req,res,next){
 
  Users.find({_id : req.params.id.trim()}, function (err, user) {
  if (err)  return next(err) ;

     if (user.length === 0){
    res.send ("No sch record");
     } else {
    Users.findById({_id: req.params.id}).remove().then(function(err, user){
        res.status(201);
       res.send("Deleted !");
    });
 }
 });

  });

  //loging In
 router.post('/login', function(req, res, next) {
    
     var post= new Users();
 
    if(req.body.userPhone){
     if(req.body.userPhone.trim()!==""){
    post.userPhone=req.body.userPhone.trim();}
        };


    if(req.body.userPassword){
     if(req.body.userPassword.trim()!==""){
    post.userPassword=req.body.userPassword.trim();}
        };


        Users.findOne({userPhone : post.userPhone}, function (err, user) {
        	       if (err) return next(err);

        if (user != null){
        	// JSON string is value which you get after use Stringify method
        	const jsonString = JSON.stringify(user);
        	// Convert jsonString to object again and get message property
            const password = JSON.parse(jsonString).userPassword;
 
            //comapre passwords
          if(post.userPassword === password) {
        //  	res.json(200, {message: post.userPhone});
           	res.json(200, {error:false, message: user});

         } else {
          	//  res.json(401, {message: "Username or password mismatch!"});
             res.json({error:true, message: "Username or password mismatch!"});

          }

          }else{
          	 // res.json(401, {message: "Username or password mismatch!"});
           	  res.json({error: true, message: "Check your data and try again !"});

 
        }
    });
        

       
});


//update User data (when loged In)
// we use Phone number to get User Object 'findOne' then we extrct _id AND use it
//to update the entire object
router.post('/user/:id',function(req,res,next){
  
    // Users.findById(req.params.id, function(err, user1){
 
 Users.findOne({userPhone: req.params.id.trim()}, function (err, user1){

  if (err)  return next(err) ;

      if(user1 !== null){  
         // JSON string is value which you get after use Stringify method
         
         const jsonString = JSON.stringify(user1);
          // Convert jsonString to object again and get message property
         const usId = JSON.parse(jsonString)._id;
 
          Users.findByIdAndUpdate(usId, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send(err);
       
        res.json(200, { message: "User Update Success !"});
    });

      } else {
        res.json({ message: "No user with That record !"});
    }            
     });                                                                                
});


// router.put('/users/:id',function(req,res,next){
  
//    Users.findByIdAndUpdate({userPhone:req.params.id},
//    {
//      $set:{
//        userFirstName:req.body.userFirstName,
//          userLastName:req.body.userLastName,
//         userGender:req.body.userGender
//       }
//     },
//     {new:true}
//     ).then(function(user){
   
//        res.json(user);
    
//    }).catch(next);
// });



module.exports = router;