const mongoDb = require('./db')


  const insertOp = async (data, collection) => {
 
    const db = await mongoDb.dbConnect()
    return db.collection(collection).insertOne(data)
  }
  
 module.exports = {
  insertOp
 };

