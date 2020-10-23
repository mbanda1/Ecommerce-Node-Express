const { addressServices } = require('../Services')
const {
	addAddress,
	findAddressById,
	findAddressByField,
	updateAddressById,
	deleteAddressById,
} = addressServices

const success = true

const postAddress = (req, res, next) => {
	const { data } = req.body

	addAddress(data)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getAddress = (req, res, next) => {
	const { _id } = req.params

	findAddressById(_id)
		.then((data) => {
			res.status(201).json({
				success,
				data,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getAddresses = (req, res, next) => {
	const { query } = req;
 
	findAddressByField(query)
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

const putAddress = (req, res, next) => {
	const { data } = req.body
	const { _id } = req.params

	updateAddressById(_id, data)
		.then(() => {
			res.status(200).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const deleteAddress = (req, res, next) => {
	const { _id } = req.params

	deleteAddressById(_id)
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
	postAddress,
	getAddress,
	getAddresses,
	putAddress,
	deleteAddress,
}
