const mongoose = require('mongoose')

const mpesaPayments = new mongoose.Schema({

  pesaCode: { type: String, required: [true, 'mpesa code required'] },
  userPhone: { type: String, required: [true, 'your Phone is required'] }

})

module.exports = mongoose.model('mpesa', mpesaPayments)
