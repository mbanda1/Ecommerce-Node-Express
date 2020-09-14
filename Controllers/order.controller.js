const { ordersServices } = require('../Services')
const {
	addOrder,
	findOrderById,
	findOrderByField,
	updateOrderById,
	deleteOrderById,
} = ordersServices

const success = true

const postOrder = (req, res, next) => {
	const { data } = req.body

	addOrder(data)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getOrder = (req, res, next) => {
	const { _id } = req.params

	findOrderById(_id)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getOrderes = (req, res, next) => {
	const { query } = req

	findOrderByField(query)
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

const putOrder = (req, res, next) => {
	const { data } = req.body
	const { _id } = req.params

	updateOrderById(_id, data)
		.then(() => {
			res.status(200).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const deleteOrder = (req, res, next) => {
	const { _id } = req.params

	deleteOrderById(_id)
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
	postOrder,
	getOrder,
	getOrderes,
	putOrder,
	deleteOrder,
}
