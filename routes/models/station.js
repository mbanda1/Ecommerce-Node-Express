const mongoose = require('mongoose'); 

 

const UserSchema = new mongoose.Schema({  
   

 region: {type:String, required:[true, 'please enter your region']},
  //location: {type: String, required: [true, 'please enter pick station']},
  
  location: [{type:String}]
 
   

 });

 
 
 module.exports=mongoose.model('pick-station', UserSchema);


//  POST DATA Appearance
//  {
// 	"region":"Donholm",
// 	"location":["one","two"]
// }