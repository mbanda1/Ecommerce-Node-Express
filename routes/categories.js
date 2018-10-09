const express = require('express');
const router = express.Router();
const Cat = require('./models/categories');

var multer=require('multer');
var dateFormat = require('dateformat');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
 var glob = require("glob");
var readfiles = require('readfiles');
var find = require('find');
const mongoose = require('mongoose');  

var storage = multer.diskStorage({
    destination: function (req, file,cb) {
    cb(null,'public/categories/'+req.body.categoryName);
    },
    
 filename: function (req, file, cb) {
           mkdirp('public/categories/'+req.body.categoryName, function (err) {
    if (err) {console.error(err)}
    else {console.log('category Directory Updated')}
});
 
    var fieldname=file.fieldname;
    var originalname = file.originalname;
    var extension = originalname.split(".");
   
        
    //filename =Date.now()+'_'+(Math.floor(Math.random()*10000))+ '.' + extension[extension.length-1];
   // filename = filename+'_'+'.'+ extension[extension.length-1];
        filename = 'picture' +'.'+ extension[extension.length-1];

      console.log('name'+ filename);

    cb(null, filename);
    
  },

});
 /* const upload = multer({dest: storage});




 router.post('/categories' , upload.single('categoryPicture'), (req, res, next) => {
  
  console.log(req.file);

     const post = new Cat({

      _id: new mongoose.Type.ObjectId(),
      categoryName: req.body.categoryName
     });


     post.save()
     .then(() => resolve({ status: 201, message: ' Sucessfully !' }))

    .catch(err => {

      if (err.code == 11000) {

        reject({ status: 409, message: ' Already Registered !' });

      } else {

        reject({ status: 500, message: 'Internal Server Error !' });
      }
    });

 });  */

router.post( '/categories',multer({storage: storage, dest: 'public/categories/'}).
fields([{ name: 'categoryPicture', maxCount: 1 }]),
 function(req,res,next){


          var post= new Cat();

       if(req.body.categoryName){
     if(req.body.categoryName.trim()!==""){
    post.categoryName=req.body.categoryName.trim();}
        };


         if(req.files.categoryPicture===undefined){
       console.log('undefined picture');
    }else{
    if(req.files.categoryPicture.length===1){
        post.categoryPicture=req.files.categoryPicture[0].filename;
    };

    }
          
      post.save(function(err,category){
      if(err){
     res.send(err);
     }else{
    fs.rename('public/categories/'+req.body.categoryName, 'public/categories/'+ category._id, function(err) {
    if ( err ) res.send(err);});
  res.send(category);     
}
  });
      
});  
//************************************************//
//get all categories
router.get('/categories', function (req, res) {
    Cat.find({}, function (err, categories) {
        if (err) return res.status(500).send("error" + err);
              if(categories.length===0){

             res.send("No categories Recorded")
        } else {
               res.status(200).send(categories)  
        }
    });
});


//get category by id
router.get('/categories/:id',function(req,res,next){
 // Cat.find({req.params.id}).then(function(category){
 	 Cat.findById(req.params.id, function (err, category) {
  	
     if(err){
    res.status(404);
    res.send("That category doesnt exist");
  }
   else {
    res.status(200);
    res.send(category);
    
   }
       
  });   
});

//get image by category name
router.get('/categories/:id/:img',function(req,res,err){
  Cat.findById({_id:req.params.id}).then(function(err, category){
  	 if (err) return res.status(500).send("error" + err);

      if(category.length===0){
          res.send('No Record');
      }else{
        res.sendFile(path.join(__dirname,'..','public/categories/', category.req.params.id,req.params.img)); 
      }
  })
    if(err){
        res.send('No image such image')
    };
 
});

//try this
/* router.get('/categorie', function (req, res) {
    Cat.find({}, function (err, categories) {
        if (err) return res.status(500).send("error" + err);
              if(categories.length===0){

             res.send("No categories Recorded")
        } else {
               //res.status(200).send(categories)  
               Cat.findById({_id:req.categories}).then(function(err, result){
                 if(err) {return res.send(err)
                 } else {
    res.sendFile(path.join(__dirname,'..','public/categories/', result.req.id,"picture.jpg")); 
             
                 }


               })
        }
    });
});   */




//delete category by name
router.delete('/categories/:id',function(req,res,next){

    Cat.findById({_id:req.params.id}).then(function(err,data){
         if(err){ res.send(err) } else {res.send("No such category")}
        // if (data.length === 0 ){res.send("No category with that name found")};
        // if(err){
      //        console.error(err.stack)
     //          next(err)
      //   }  
      
    
var rimraf = require('rimraf');
console.log('public/categories/'+ req.params.id);

rimraf('public/categories/'+ req.params.id, function () { console.log('done'); });
     
  Cat.find({_id:req.params.id}).remove().then(function(errr, category){
  	          if(errr){ 
  	         	res.send(errr);
  	         } else {
  	         	 res.send('category Deleted');

  	         }

        });
     });
});
 
  

module.exports = router;