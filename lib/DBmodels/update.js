const error = require('../../middleware/catchErrors');
const db = require('../../db')


class UpdateOps {
    constructor() {
        this.updateCollection = this.updateCollection.bind(this);
    }

    async updateCollection(filter, data, upsert) {
            return new Promise((resolve) => {
                db.userCollection.updateOne(filter, {$set:{data}} , {upsert: upsert});
                resolve(data);
            }).catch(e => {
                return e
            })

    }


}

module.exports = new UpdateOps();