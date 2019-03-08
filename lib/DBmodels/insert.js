const error = require('../../middleware/catchErrors')
const db = require('../../db')

class InsertOps {
  constructor () {
    this.insert = this.insert.bind(this)
  }

  insert (data, collection) {
    return new Promise((resolve) => {
      db[collection].insertOne(data)
      resolve(data)
    }).catch(e => {
      return { error: e.message }
    })
  }
}

module.exports = new InsertOps()
