const express = require('express');
const router = express.Router();
const Brand = require('./models/brands');
 
var multer=require('multer');
var dateFormat = require('dateformat');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
 var glob = require("glob");
var readfiles = require('readfiles');
var find = require('find');



var storage = multer.diskStorage({
    destination: function (req, file,cb) {
    cb(null,'public/brands/'+req.body.brandName );
    },
    
 filename: function (req, file, cb) {
           mkdirp('public/brands/'+req.body.brandName, function (err) {
    if (err) {console.error(err)}
    else {console.log('category Directory Updated')}
});
 
    var fieldname=file.fieldname;
    var originalname = file.originalname;
    var extension = originalname.split(".");
   
        
    filename =Date.now()+'_'+(Math.floor(Math.random()*10000))+ '.' + extension[extension.length-1];
   // filename = filename+'_'+'.'+ extension[extension.length-1];
       // filename = 'picture' +'.'+ extension[extension.length-1];

      console.log('name'+ filename);

    cb(null, filename);
    
  },

});
 

router.post('/brands',multer({storage: storage, dest: 'public/brands/'}).
fields([{ name: 'brandImage_1', maxCount: 1 }, { name: 'brandImage_2', maxCount: 1 }]),
 function(req,res,next){


          var post= new Brand();
          //var check_cat = new Cat();

    if(req.body.brandCategory){
     if(req.body.brandCategory.trim()!==""){
    post.brandCategory=req.body.brandCategory.trim();}
        };

    if(req.body.brand_type){
     if(req.body.brand_type.trim()!==""){
    post.brand_type=req.body.brand_type.trim();}
        };

 if(req.body.brandName){
     if(req.body.brandName.trim()!==""){
    post.brandName=req.body.brandName.trim();}
        };

 if(req.body.brandPrice){
     if(req.body.brandPrice.trim()!==""){
    post.brandPrice=req.body.brandPrice.trim();}
        };


 if(req.body.brandSpecification){
     if(req.body.brandSpecification.trim()!==""){
    post.brandSpecification=req.body.brandSpecification.trim();}
        };

 if(req.body.brandDescription){
     if(req.body.brandDescription.trim()!==""){
    post.brandDescription=req.body.brandDescription.trim();}
        };



     
         if(req.files.brandImage_1===undefined){
       console.log('undefined picture image 1');
    }else{
    if(req.files.brandImage_1.length===1){
        post.brandImage_1=req.files.brandImage_1[0].filename;
     };
  }


 if(req.files.brandImage_2===undefined){
       console.log('undefined picture image 2');
    }else{
    if(req.files.brandImage_2.length===1){
        post.brandImage_2=req.files.brandImage_2[0].filename;
     };
  }
 
     
     
      post.save(function(err,brand){
      if(err){
     res.send(err);
     }else{
    fs.rename('public/brands/'+req.body.brandName, 'public/brands/'+ brand._id, function(err) {
    if ( err ) console.log('ERROR: ' + err);});
  res.send(brand);     
}
  });
      
});



//************************************************//
//get all brands
router.get('/brands', function (req, res) {
    Brand.find({}, function (err, brands) {

        if (err) {res.json(err.errors)};

              if(brands.length===0){

             res.send("No brands Recorded")
        } else {
               res.status(200).json(brands)  
        }
    });
});


//get brand by id
/*router.get('/brands/:id',function(req,res,next){
 
  	 Brand.findById(req.params.id, function (err, brand) {
  	 if(err){
    res.status(404);
    res.send("That movie doesnt exist");
  }
   else {
    res.status(200);
    res.send(brand);
    
   }
       
  });   
});*/
 


 router.get('/brands/:cat', function (req, res) {
   
 Brand.find({brandCategory: req.params.cat.trim()}, function (err, brand){
         if(err){
            res.json(err.errors);
   }

   if(brand.length===0) {
      res.send("No data with That category")
   }else {
    res.status(200);
    res.json(brand);
    
   }
      
 });
});  


//get brand pic
router.get('/brands/:id/:img',function(req,res,err){
  Brand.findById({_id:req.params.id}).then(function(err, brand){
  
  if (err) {res.send(err)};

      if(brand.length===0){
res.sendFile(path.join(__dirname,'..','public/brands/', noImage.JPEG));
      }else{
        res.sendFile(path.join(__dirname,'..','public/brands/',
         brand.req.params.id,req.params.img)); 
       }
  });
    
 
});


//brand by category name and finaly pics  (under that)
router.get('/brands/:cat/:brand_id/:img', function (req, res, err) {
   
 Brand.find({brandCategory:req.params.cat})

 .then((brands) => {
   
   if(brands.length !== 0 ){
      // var id = (req.params.idd);
   //    var img = (reg.params.iddd);
     //  res.send(id);
      res.sendFile(path.join(__dirname,'..','public/brands/', req.params.brand_id, req.params.img));   

     } else {
     // res.status(400);
      res.sendFile(path.join(__dirname,'..','public/brands/', noImage.jpg));   
     }


 }).catch(err => {

   res.send(err);

 });

});
    
 





module.exports = router;