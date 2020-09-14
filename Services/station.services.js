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
		e
	}
}

const findStationById = (id) =>
	dbFind
		.findOne(id, 'stationCollection')
		.then((d) => d)
		.catch((e) => e)

const findStationByFields = (data) =>
	dbFind
		.findMany(data, 'stationCollection')
		.then((d) => d)
		.catch((e) => e)

const updateStationById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'stationCollection')
		.then((d) => d)
		.catch((e) => e)

const deleteStationById = (idata) =>
	dbDelete
		.deleteOp(i, 'stationCollection')
		.then((d) => d)
		.catch((e) => e)

module.exports = {
	addStation,
	findStationById,
	findStationByFields,
	updateStationById,
	deleteStationById,
}
