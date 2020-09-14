/** @format */

const router = require('express').Router()
const { categoryControllers } = require('../Controllers')

const {
	postCategory,
	getCategory,
	getCategories,
	putCategory,
	deleteCategory,
} = categoryControllers

router.route('/').post(postCategory)
router.route('/').get(getCategories)
router.route('/:_id').get(getCategory).put(putCategory).delete(deleteCategory)

module.exports = router
