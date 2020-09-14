/** @format */

const router = require('express').Router()
const { orderControllers } = require('../Controllers')

const { postOrder, getOrder, getOrderes, putOrder, deleteOrder } = orderControllers

router.route('/').post(postOrder)
router.route('/').get(getOrderes)
router.route('/:_id').get(getOrder).put(putOrder).delete(deleteOrder)

module.exports = router
