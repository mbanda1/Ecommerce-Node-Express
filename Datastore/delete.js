const mongoDb = require('./db')
const { ObjectId } = require('mongodb')


  const deleteOp = async (_id, collection) => {
    const db = await mongoDb.dbConnect()
    return db.collection(collection).deleteOne({ "_id" : ObjectId(_id)})
  }
  
 module.exports = {
  deleteOp
 };
