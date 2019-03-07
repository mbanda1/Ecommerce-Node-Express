
const MongoClient = require('mongodb').MongoClient
const log = require('../tools/logger')
const error = require('../middleware/catchErrors')

const url = 'mongodb://localhost:27017/Biashara-1'
const dbName = 'Biashara-1'

module.exports.init = function () {
  MongoClient.connect(url, { useNewUrlParser: true }, function (e, client) {
    if (e) error(e)

    log.info('Db connected')

    let db = client.db(dbName)
    // module.exports.client = client;
    module.exports.userCollection = db.collection('users')
    module.exports.addressCollection = db.collection('address')
    module.exports.ordersCollection = db.collection('orders')
    module.exports.stationCollection = db.collection('stations')
    module.exports.mpesaCollection = db.collection('mpesa')
    module.exports.categoryCollection = db.collection('categories')
    module.exports.brandCollection = db.collection('brands')
  })
}
// // Insert Object

// // fInd One
// utils.findSingle = (data, collection) => (() => {
//    return new Promise.resolve(() => {
//     resolve(db.collection(collection).findOne(data))
//    })
// })

// utils.getLatest = (q) => db.collection('audit').find(q).limit(20).toArray((error, result) => {
//   if (error) throw error
//   log.info('MongoDB connected !')
// });
