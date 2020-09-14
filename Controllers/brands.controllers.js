
const { brandsServices } = require('../Services');
 const {
  addBrand,
	findBrandById,
	findBrandsByField,
	updateBrandById,
	deleteBrandById,
} = brandsServices

const success = true

const postBrand = (req, res, next) => {
	const { data } = req.body

	addBrand(data)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getBrand = (req, res, next) => {
	const { _id } = req.params

	findBrandById(_id)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getBrands = (req, res, next) => {
	const { query } = req

	findBrandsByField(query)
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

const putBrand = (req, res, next) => {
	const { data } = req.body
	const { _id } = req.params

	updateBrandById(_id, data)
		.then(() => {
			res.status(200).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const deleteBrand = (req, res, next) => {
	const { _id } = req.params

	deleteBrandById(_id)
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
  postBrand,
  getBrand,
  getBrands,
  putBrand,
  deleteBrand,
}
