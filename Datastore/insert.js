const mongoDb = require('./db')


  const insertOp = async (data, collection) => {
 
    const db = await mongoDb.dbConnect()
    return db.collection('addressCollection').insertOne(data)
  }
  
 module.exports = {
  insertOp
 };

