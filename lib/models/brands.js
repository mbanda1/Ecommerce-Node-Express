const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  // categoryName:{type:String, trim : true, index:{unique:true}, required:[true,'please eneter category name']},
  // : {type :String, required :true}

  brandCategory: { type: String, required: [true, 'please enter brand category'] },
  brand_type: { type: String, required: [true, 'please enter brand type'] },
  brandName: { type: String, required: [true, 'please enter brand Name'] },
  brandImage_1: { type: String, required: true },
  brandImage_2: { type: String },
  brandPrice: { type: String, required: [true, 'please enter brand price'] },
  brandSpecification: { type: String, required: [true, 'please enter brand specification'] },
  brandDescription: { type: String, required: [true, 'please enter brand Description'] }
})

module.exports = mongoose.model('brands', UserSchema)
