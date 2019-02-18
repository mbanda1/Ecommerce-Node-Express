const error = require('../../middleware/catchErrors');
const logger = require('../../tools/logger')
const db = require('../../db')        


class DeleteOps {
    constructor() {  
        this.deleteRecord = this.deleteRecord.bind(this)
      }


      async deleteRecord(quey, collection,) {
        try {
            return new Promise((resolve) => {
                resolve(db[collection].findOneAndDelete(quey));
            });
        }
        catch (e) {
            logger.error(e.message);
            return { error: e.message };
        }
    }

}

module.exports = new DeleteOps();