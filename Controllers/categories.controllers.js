const { categoriesServices } = require('../Services')
const {
	addCategory,
	findCategoryById,
	findCategoriesByField,
	updateCategoryById,
	deleteCategoryById,
} = categoriesServices

const success = true

const postCategory = (req, res, next) => {
	const  { body }  = req
	let data = {...body}
	
    if (req.file && req.file.filename){
		data.picture = req.file.filename
	} else{
		data = data.data
	}
 
	addCategory(data)
		.then(() => {
			res.status(201).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const getCategory = (req, res, next) => {
	const { _id } = req.params

	findCategoryById(_id)
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

const getCategories = (req, res, next) => {
	const { query } = req

	findCategoriesByField(query)
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

const putCategory = (req, res, next) => {
	const { data } = req.body
	const { _id } = req.params

	updateCategoryById(_id, data)
		.then(() => {
			res.status(200).json({
				success,
			})
		})
		.catch((error) => {
			next(error)
		})
}

const deleteCategory = (req, res, next) => {
	const { _id } = req.params

	deleteCategoryById(_id)
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
  postCategory,
  getCategory,
  getCategories,
  putCategory,
  deleteCategory,
}
