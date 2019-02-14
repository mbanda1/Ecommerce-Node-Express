
const express = require('express');
const router = express.Router();
const Order = require('./models/orders');



 router.post('/order', function (req, res, next) {
    var p = new Order();  
    p.user_id = req.body.user_id;  //user id
    p.order_id = req.body.order_id;  //order Random Id

  // p.order_List = {
  //   p.brand_id = req.body.brand_id;
  //   p.category =req.body.category;
  //   p.name  = req.body.name;
  //   p.image = req.body.image;
  //   p.pricePerItem = req.body.pricePerItem;
  //   p.quantityPerItem = req.body.quantityPerItem;   
  //   p.totalPriceperItem = req.body.totalPriceperItem;
  //      }

    p.order_List = req.body.order_List;
    p.finalPrice = req.body.finalPrice;
    p.Address_name = req.body.Address_name;
    p.Address_phone = req.body.Address_phone;
    p.Address_address = req.body.Address_address;
    p.Address_region = req.body.Address_region;
    p.Address_location = req.body.Address_location 

    p.save(function (err, order) {  
        if (err) {
           // return next(err)
           res.json(500,{error: true, message: err})
        }else {
        // res.status(201);
        // res.json(order);
        res.json(200, {error: false, message: "Order made Successfully !"})

         }
     });  
});



// //GET ALL
router.get('/order', function (req, res) {
    Order.find({}, function (err, order) {
        if (err) return next(err);
        res.status(201);
        res.json(order);
    });
});



//geat all orders bazing on category and brand
router.get('/order/:cat/:brand', function(req, res, next) {
    Order.find({category: req.params.cat.trim()}, function (err, orderCat){
       if (err) return next(err);

   if(orderCat.length===0) {
      res.send("No data with That category")
   }else {
     Order.find({name: req.params.brand.trim()}, function(err, orderBrand){
               if (err) return next(err);
               res.status(201);
        res.json(orderBrand);

     })  
   }
      
 });

});


//delete order by ORDER_id
 
// DELETES  locatiob by id
router.delete('/station/:order_id', function (req, res) {
    Order.findByIdAndRemove(req.params.order_id, function (err, order) {
        if (err) return res.status(500).send("There was a problem removing.");

        if (order.length === 0) {
            res.send("No data with that record !")
        } else{
        res.status(200).send("Record deleted !");
       }
    });
});


//geat all orders bazing on category and brand
// router.get('/order1/:brand/:brandId/:img', function(req, res) {
//     Order.find({name: req.params.brand.trim()}, function (err, orderCat){
//        if (err) return next(err);

//    if(orderCat.length===0) {
//       res.send("No data with That category")
//    }else {
//      Order.find({brand_id: req.params.brandId.trim()}, function(err, orderBrand){
//                if (err) return next(err);
//                res.status(201);
//       res.sendFile(path.join(__dirname,'..','public/brands/', req.params.brandId, req.params.img));   

//      })  
//    }
      
//  });

// });


  


module.exports = router;
