const mongoose = require('mongoose'); 


const OrderItemsArray = new mongoose.Schema({  

  //  //product ordered info
     brand_id: {type:String, required:[true, 'Brand id required']},
   category: {type:String, required:[true, 'category is required']},

   //order items
  name: {type:String, required:[true, 'product name required']},  // product name
    image: {type:String, required:[true, 'product image required']},
   pricePerItem: {type:Number, required:[true, 'product price required']},
   quantityPerItem: {type:Number, required:[true, 'Quantity ordered required']},
   totalPriceperItem: {type:Number, required:[true, 'Total order required']}
             
});


const UserSchema = new mongoose.Schema({  
   
   //user info
   user_id: {type:String, required:[true, 'user Id required']},
   order_id: {type:String, required:[true, 'Order Id required']},


     order_List: [OrderItemsArray],

    //final price
   finalPrice: {type:Number, required:[true, 'final price Required']},
 
  // //shiping address
    Address_name: {type:String, required:[true, 'your name is required']},
   Address_phone: {type:String, required:[true, 'your phone isrequired']},
   Address_address: {type: String, required: [true, 'your address is required']},
   Address_region: {type: String, required: [true, 'your region is required']},
   Address_location: {type:String, required:[true, 'your location is required']}

    
 });

 
 
 module.exports=mongoose.model('orders', UserSchema);