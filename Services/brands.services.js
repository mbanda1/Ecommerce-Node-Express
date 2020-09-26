const { APIerror } = require('../middleware/error')
const { dbInsert, dbUpdate, dbDelete, dbFind } = require('../Datastore')

const addBrand = (data) => {
	try {
		const fields = [
			'brandBrand',
			'brand_type',
			'brandName',
			'brandPrice',
			'brandSpecification',
			'brandDescription',
		]
		fields.forEach((element) => {
			if (!data[element]) {
				throw new APIerror(`${element} missing`, 400)
			}
		})

		let insertData = {
			brand: data.brandName,
			brand_type: data.brand_type,
			brandName: data.brandName,
			brandPrice: data.brandPrice,
			brandSpecification: data.brandSpecification,
			brandDescription: data.brandDescription,
			insertedOn: new Date(),
		}

		return dbInsert.insertOp(insertData, 'brandCollection')
	} catch (e) {
		if (e instanceof APIerror) throw e
		throw new APIerror('Failed to add new brand')
	}
}

const findBrandById = (id) =>
	dbFind
		.findOne(id, 'brandCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to find brand by id')
		})

const findBrandsByField = (data) =>
	dbFind
		.findMany(data, 'brandCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to find brand by field')
		})

const updateBrandById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'brandCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to update brand by id')
		})

const deleteBrandById = (id) =>
	dbDelete
		.deleteOp(id, 'brandCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to delete brand by id')
		})

module.exports = {
	addBrand,
	findBrandById,
	findBrandsByField,
	updateBrandById,
	deleteBrandById,
}
