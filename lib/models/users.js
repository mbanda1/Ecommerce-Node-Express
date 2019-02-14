const mongoose = require('mongoose'); 

const UserSchema = mongoose.Schema({  
	  userPhone: {type:String,index:{unique:true}, required:[true, 'please enter Phone Number']},
	  userPassword: {type: String, required:[true, 'please enter user Name']},
	  userFirstName : String,
	  userLastName : String,
      userGender : {type: String}

});

 module.exports = mongoose.model('users', UserSchema);