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
		console.log(e)
		if (e instanceof APIerror) throw e
		throw new APIerror('Failed to add new address')
	}
}

const findAddressById = (id) =>
	dbFind
		.findOne(id, 'addressCollection')
		.then((d) => d)
		.catch((e) => e)

const findAddressByField = (data) =>
	dbFind
		.findMany(data, 'addressCollection')
		.then((d) => d)
		.catch((e) => e)

const updateAddressById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'addressCollection')
		.then((d) => d)
		.catch((e) => e)

const deleteAddressById = (idata) =>
	dbDelete
		.deleteOp(i, 'addressCollection')
		.then((d) => d)
		.catch((e) => e)

module.exports = {
	addAddress,
	findAddressById,
	findAddressByField,
	updateAddressById,
	deleteAddressById,
}
