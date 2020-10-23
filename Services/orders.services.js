const { APIerror } = require('../middleware/error')
const { dbInsert, dbUpdate, dbDelete, dbFind } = require('../Datastore')

const addOrder = (data) => {
	try {
		const order = [
			'brandId',
			'category',
			'name',
			'image',
			'pricePerItem',
			'quantityPerItem',
			'totalPricePerItem',
		]
		const address = [
			'addressName',
			'addressPhone',
			'addressAddress',
			'addressRegion',
			'addressLocation',
		]

		if (!(data.order instanceof Array)) throw new APIerror('order missing on Address', 400)

		order.forEach((element) => {
			if (!data.order[element]) {
				throw new APIerror(`${element} missing on Order`, 400)
			}
		})
		address.forEach((element) => {
			if (!data.address[element]) {
				throw new APIerror(`${element} missing on Address`, 400)
			}
		})

		const orderObj = {
			user: {
				userId: data.userId,
				orderId: Math.floor(Math.random() * 100),
			},
			address: {
				addressName: data.address.addressName,
				addressPhone: data.address.addressPhone,
				addressAddress: data.address.addressAddress,
				addressRegion: data.address.addressRegion,
				addressLocation: data.address.addressLocation,
			},
			order: {
				category: data.order.category,
				brandId: data.order.brandId,
				name: data.order.name,
				image: data.order.image,
				pricePerItem: data.order.pricePerItem,
				quantityPerItem: data.order.quantityPerItem,
				totalPricePerItem: data.order.totalPricePerItem,
			},
			insertedOn: new Date(),
		}

		return dbInsert.insertOp(orderObj, 'ordersCollection')
	} catch (e) {
		e
	}
}

const findOrderById = (id) =>
	dbFind
		.findOne(id, 'ordersCollection')
		.then((d) => d)
		.catch((e) => e)

const findOrderByField = (data) =>
	dbFind
		.findMany(data, 'ordersCollection')
		.then((d) => d)
		.catch((e) => e)

const updateOrderById = (id, data) =>
	dbUpdate
		.updateOp(id, data, 'ordersCollection')
		.then((d) => d)
		.catch((e) => e)

const deleteOrderById = (idata) =>
	dbDelete
		.deleteOp(i, 'ordersCollection')
		.then((d) => d)
		.catch((e) => e)

module.exports = {
	addOrder,
	findOrderById,
	findOrderByField,
	updateOrderById,
	deleteOrderById,
}
