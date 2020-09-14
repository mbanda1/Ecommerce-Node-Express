const mongoDb = require('./db')
const { ObjectID } = require('mongodb')


  const deleteOp = async (_id, collection) => {
    const db = await mongoDb.dbConnect()
    return db.collection(collection).deleteOne({ "_id" : ObjectID(_id)})
  }
  
 module.exports = {
  deleteOp
 };
