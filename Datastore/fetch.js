const mongoDb = require('./db')

const findOne = async (id, collection, projection) => {
	const db = await mongoDb.dbConnect()
	return db.collection([collection]).findOne({ _id: ObjectId(id) }, { projection })
}

const findMany = async (query, collection, projection) => {
 	const db = await mongoDb.dbConnect()
	return db.collection(collection).findMany(query, { projection })
}

module.exports = {
	findOne,
	findMany,
}
