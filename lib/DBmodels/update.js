const error = require('../../middleware/catchErrors');
const db = require('../../db')


class UpdateOps {
    constructor() {
        this.updateUserCollection = this.updateUserCollection.bind(this);
        this.updateCollection  = this.updateCollection.bind(this)
    }

    async updateUserCollection(filter, data, upsert) {
            return new Promise((resolve) => {
                db.userCollection.updateOne(filter, {$set:{data}} , {upsert: upsert});
                resolve(data);
            }).catch(e => {
                return e
            })

    }

    async updateCollection(filter, collection, data, upsert,) {
        return new Promise((resolve) => {
            resolve(db[collection].updateOne(filter, {$set:{data}} , {upsert: upsert}));
        }).catch(e => {
            return e
        })

}

}

module.exports = new UpdateOps();