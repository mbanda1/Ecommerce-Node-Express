const { APIerror } = require('../middleware/error')
const { dbInsert, dbUpdate, dbDelete, dbFind } = require('../Datastore')

const addCategory = (data) => {
	try {
	
		if (!data.categoryName) {
			throw new APIerror('categoryName missing', 400)
		}

		data.insertedOn = new Date()

		return dbInsert.insertOp(data, 'categoryCollection')
	} catch (e) {
 		if (e instanceof APIerror) throw e
		throw new APIerror('Failed to add new category')
	}
}

const findCategoryById = (id) =>
	dbFind
		.findOne(id, 'categoryCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to find category by id')
		})

const findCategoriesByField = (data) =>
	dbFind
		.findMany(data, 'categoryCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to find category by field')
		})

const updateCategoryById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'categoryCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to update category by id')
		})

const deleteCategoryById = (id) =>
	dbDelete
		.deleteOp(id, 'categoryCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to delete category by id')
		})

module.exports = {
	addCategory,
	findCategoryById,
	findCategoriesByField,
	updateCategoryById,
	deleteCategoryById,
}
