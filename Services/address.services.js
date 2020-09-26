const { APIerror } = require('../middleware/error')
const { dbInsert, dbUpdate, dbDelete, dbFind } = require('../Datastore')

const addAddress = (data) => {
	try {
		const fields = ['name', 'phone', 'address', 'region', 'location']
		fields.forEach((element) => {
			if (!data[element]) {
				throw new APIerror(`propery ${element} missing`, 400)
			}
		})

		let InsertData = {
			name: data.name,
			phone: data.phone,
			address: data.address,
			region: data.region,
			location: data.location,
 			insertedOn: new Date(),
		}

		return dbInsert.insertOp(InsertData, 'addressCollection')
	} catch (e) {
 		if (e instanceof APIerror) throw e
		throw new APIerror('Failed to add new address')
	}
}

const findAddressById = (id) =>
	dbFind
		.findOne(id, 'addressCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to find address by id')
		})

const findAddressByField = (data) =>
	dbFind
		.findMany(data, 'addressCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to find address by field')
		})

const updateAddressById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'addressCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to delete address by id')
		})

const deleteAddressById = (id) =>
	dbDelete
		.deleteOp(id, 'addressCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to address brand by id')
		})

module.exports = {
	addAddress,
	findAddressById,
	findAddressByField,
	updateAddressById,
	deleteAddressById,
}
