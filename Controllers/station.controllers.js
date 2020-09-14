const { ordersServices } = require('../Services')
const {
    addStation,
	findStationById,
	findStationByFields,
	updateStationById,
	deleteStationById,
} = ordersServices

const success = true

const postStation = (req, res, next) => {
	const { data } = req.body

	addStation(data)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getStation = (req, res, next) => {
	const { _id } = req.params

	findStationById(_id)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getStations = (req, res, next) => {
	const { query } = req

	findStationByFields(query)
		.then((data) => {
			res.status(201).json({
				data,
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const putStation = (req, res, next) => {
	const { data } = req.body
	const { _id } = req.params

	updateStationById(_id, data)
		.then(() => {
			res.status(200).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const deleteStation = (req, res, next) => {
	const { _id } = req.params

	deleteStationById(_id)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

module.exports = {
	postStation,
	getStation,
	getStations,
	putStation,
	deleteStation,
}
