const router = require('express').Router()
const { APIerror } = require('../middleware/error')
const multer = require('multer')
const mkdirp = require('mkdirp')

// Routes
const categoryStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		const body = req.body
		const myDir = `./uploads/categories/${body.categoryName}`

		mkdirp(myDir, function (e) {
			if (e) throw e
		})
		cb(null, myDir)
	},

	filename: function (req, file, cb) {
		const originalname = file.originalname
		const extension = originalname.split('.')

		const filename = 'picture' + '.' + extension[extension.length - 1]

		cb(null, filename)
		log.info('File uploaded')
	},
})

let productStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		const myDir = `./uploads/brands/${req.body.brandName}`

		mkdirp(myDir, function (e) {
			if (e) throw e
		})
		cb(null, myDir)
	},

	filename: function (req, file, cb) {
		const originalname = file.originalname
		const extension = originalname.split('.')

		const filename =
			Date.now() +
			'_' +
			Math.floor(Math.random() * 10000) +
			'.' +
			extension[extension.length - 1]

		cb(null, filename)
	},
})

const upload = multer({ storage: categoryStorage })
const upload2 = multer({ storage: productStorage })
router.use('/category', upload.single('categoryPicture'), require('./categories.routes'))
router.use('/brand', upload2.single('brandPicture'), require('./categories.routes'))
router.use('/address', require('./address.routes'))
router.use('/order', require('./orders.routes'))
router.use('/station', require('./stations.route'))

router.get('/', (req, res) => {
	res.send('JESUS IS LORD ::: YESU NI BWANA')
})

// Handling 404 responses
router.use((req, res, next) => {
	next(new APIerror('Repentance somebody', 404))
})

module.exports = router
