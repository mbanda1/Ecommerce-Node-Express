/** @format */

const router = require('express').Router()
const { addressControllers } = require('../Controllers')

const { postAddress, getAddress, getAddresses, putAddress, deleteAddress } = addressControllers

router.route('/').post(postAddress)
router.route('/').get(getAddresses)
router.route('/:_id').get(getAddress).put(putAddress).delete(deleteAddress)

module.exports = router
