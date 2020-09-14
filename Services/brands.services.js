const { APIerror } = require('../middleware/error')
const { dbInsert, dbUpdate, dbDelete, dbFind } = require('../Datastore')

const addBrand = (data) => {
	try {
		const fields = [
			'brandName, brandBrand',
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
			picture: file.filename,
			insertedOn: new Date(),
		}

		return dbInsert.insertOp(insertData, 'brandCollection')
	} catch (e) {
		e
	}
}

const findBrandById = (id) =>
	dbFind
		.findOne(id, 'brandCollection')
		.then((d) => d)
		.catch((e) => e)

const findBrandsByField = (data) =>
	dbFind
		.findMany(data, 'brandCollection')
		.then((d) => d)
		.catch((e) => e)

const updateBrandById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'brandCollection')
		.then((d) => d)
		.catch((e) => e)

const deleteBrandById = (idata) =>
	dbDelete
		.deleteOp(i, 'brandCollection')
		.then((d) => d)
		.catch((e) => e)

module.exports = {
	addBrand,
	findBrandById,
	findBrandsByField,
	updateBrandById,
	deleteBrandById,
}
