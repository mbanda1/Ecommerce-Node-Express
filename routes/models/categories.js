const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({  
  categoryName:{type:String, trim : true, index:{unique:true}, required:[true,'please eneter category name']},
  categoryPicture: {type :String, required :true}
 });

//mongoose.model('categories', UserSchema);

//module.exports = mongoose.model('categories');

 

 const categories =mongoose.model('categories',UserSchema,"categories");
module.exports=categories;


