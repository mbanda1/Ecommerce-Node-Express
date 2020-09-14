require('dotenv').config()

const { MongoClient } = require('mongodb')
// const logger = require('../logs/logger');

const url = (process.env.NODE_ENV === 'test')
  ? process.env.TRACKING_DATABASE_TEST_CONNECTION
  : process.env.DATABASE_DEVELOPMENT_URL


 
let _db
module.exports = {

  connectDB: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client ) {
      _db  = client.db();
 

       return callback( err );
    } );
  },

  dbConnect: function() {
    return _db;
  }
};
