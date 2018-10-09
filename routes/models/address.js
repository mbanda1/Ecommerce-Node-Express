const mongoose = require('mongoose'); 

 
 const fullAddress = new mongoose.Schema({  
  userPhone : {type:String, required:[true, 'your Phone is required']},
 
    name: {type:String, required:[true, 'your name is required']},
  phone: {type:String, required:[true, 'your phone isrequired']},
  address: {type: String, required: [true, 'your address is required']},
  region: {type: String, required: [true, 'your region is required']},
  location: {type:String, required:[true, 'your location is required']}

 });

 
 
 module.exports=mongoose.model('address', fullAddress);