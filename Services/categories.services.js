const { APIerror } = require('../middleware/error')
const { dbInsert, dbUpdate, dbDelete, dbFind } = require('../Datastore')

const addCategory = (data) => {
	try {
		if (!data.categoryName) {
			throw new APIerror('categoryName missing', 400)
		}

		let postData = {
			category: data.categoryName,
			picture: data.filename,
			insertedOn: new Date(),
		}

		return dbInsert.insertOp(postData, 'categoryCollection')
	} catch (e) {
		e
	}
}

const findCategoryById = (id) =>
	dbFind
		.findOne(id, 'categoryCollection')
		.then((d) => d)
		.catch((e) => e)

const findCategoriesByField = (data) =>
	dbFind
		.findMany(data, 'categoryCollection')
		.then((d) => d)
		.catch((e) => e)

const updateCategoryById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'categoryCollection')
		.then((d) => d)
		.catch((e) => e)

const deleteCategoryById = (idata) =>
	dbDelete
		.deleteOp(i, 'categoryCollection')
		.then((d) => d)
		.catch((e) => e)

module.exports = {
	addCategory,
	findCategoryById,
	findCategoriesByField,
	updateCategoryById,
	deleteCategoryById,
}
