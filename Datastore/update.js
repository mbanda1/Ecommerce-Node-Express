const mongoDb = require('./db')

const updateOp = async (id, data, collection) => {
	const db = await mongoDb.dbConnect()
	return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data })
}

module.exports = {
	updateOp,
}
