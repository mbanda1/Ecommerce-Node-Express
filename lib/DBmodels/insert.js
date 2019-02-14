const error = require('../../middleware/catchErrors');
const db = require('../../db')


class InsertOps {
    constructor() {
        this.insert = this.insert.bind(this);
    }


    insert(data) {
        return new Promise((resolve) => {
            db.userCollection.insertOne(data);
            resolve(data);
        }).catch(e => {
            return {error: e}
        })

    }


}

module.exports = new InsertOps();