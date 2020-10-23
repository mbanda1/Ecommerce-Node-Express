/** @format */

const router = require('express').Router()
const { stationControllers } = require('../Controllers')

const { postStation, getStation, getStations, putStation, deleteStation } = stationControllers

router.route('/').post(postStation)
router.route('/').get(getStations)
router.route('/:_id').get(getStation).put(putStation).delete(deleteStation)

module.exports = router
