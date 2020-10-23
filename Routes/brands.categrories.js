/** @format */

const router = require('express').Router()
const { branchControllers } = require('../Controllers')

const { postBrand, getBrand, getBrands, putBrand, deleteBrand } = branchControllers


router.route('/').post(postBrand)
router.route('/').get(getBrands)
router.route('/:_id').get(getBrand).put(putBrand).delete(deleteBrand)

module.exports = router
