const error = require('../../middleware/catchErrors');
const logger = require('../../tools/logger')
const db = require('../../db')        


class FetchOps {
    constructor() {
        this.fetchData = this.fetchData.bind(this);
    }


    fetchData(phone, projection) {
        return new Promise((resolve) => {
           resolve(db.userCollection.findOne(phone, { 'projection': projection}))
        }).catch(e => {
            logger.error(e.message)
            return {error: e.message}
        })

    }


}

module.exports = new FetchOps();