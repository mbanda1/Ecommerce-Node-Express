const error = require('../../middleware/catchErrors')
const logger = require('../../tools/logger')
const db = require('../../db')

class FetchOps {
  constructor () {
    this.fetchData = this.fetchData.bind(this)
    this.countRecord = this.countRecord.bind(this)
    this.fetchAll = this.fetchAll.bind(this)
  }

  async fetchData (quey, collection, projection) {
    try {
      return new Promise((resolve) => {
        resolve(db[collection].findOne(quey, { 'projection': projection }))
      })
    } catch (e) {
      logger.error(e.message)
      return { error: e.message }
    }
  }

  async fetchAll (query, collection, projection) {
    try {
      return new Promise((resolve) => {
        resolve(db[collection].find(query, { 'projection': projection }))
      })
    } catch (e) {
      logger.error(e.message)
      return { error: e.message }
    }
  }

  async countRecord (params, collection) {
    try {
      return new Promise((resolve) => {
        resolve(db[collection].countDocuments(params))
      })
    } catch (e) {
      logger.error(e.message)
      return { error: e.message }
    }
  }
}

module.exports = new FetchOps()
