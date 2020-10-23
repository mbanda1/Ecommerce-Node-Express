require('dotenv').config()
const { MODELerror, APIerror } = require('./index')

const errorHandler = (err, req, res, next) => {
	const success = false

	console.error(err.message)
	if (err.detail && process.env.NODE_ENV === 'production') console.error(err.detail)

	if (err instanceof APIerror) {
		res.status(err.status).json({
			success,
			errors: err.message,
		})
	} else if (err instanceof MODELerror) {
		res.status(err.status).json({
			success,
			errors: err.detail,
		})
	} else {
		res.status(500).json({
			success,
			errors: 'Internal Server Error',
		})
	}
}

module.exports = errorHandler
