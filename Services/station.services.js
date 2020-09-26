const { APIerror } = require('../middleware/error')
const { dbInsert, dbUpdate, dbDelete, dbFind } = require('../Datastore')

const addStation = (data) => {
 	try {
		const fields = ['region', 'location']
		fields.forEach((element) => {
			if (!data[element]) {
				throw new APIerror(`${element} missing`, 400)
			}
		})

		let InsertData = {
			region: data.region,
			location: [data.location],
			insertedOn: new Date(),
		}

		return dbInsert.insertOp(InsertData, 'stationCollection')
	} catch (e) {
		if (e instanceof APIerror) throw e
		throw new APIerror('Failed to add new station')
	}
}

const findStationById = (id) =>
	dbFind
		.findOne(id, 'stationCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to find station by id')
		})

const findStationByFields = (data) =>
	dbFind
		.findMany(data, 'stationCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to find station by field')
		})

const updateStationById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'stationCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to update station by id')
		})

const deleteStationById = (id) =>
	dbDelete
		.deleteOp(id, 'stationCollection')
		.then((d) => d)
		.catch((e) => {
			throw new APIerror('Failed to delete station by id')
		})

module.exports = {
	addStation,
	findStationById,
	findStationByFields,
	updateStationById,
	deleteStationById,
}
