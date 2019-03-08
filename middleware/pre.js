const logger = require('../tools/logger')

let auth = {
  preJson: async (req, res, next) => {
    if (!req.body.params) {
      if (req._parsedUrl.pathname === '/categories/' || '/brands/') {
        next()
      } else { res.status(400).send({ error: { message: 'missing auth credentials' } }) }
    } else {
      next()
    }
  }

}

module.exports = auth
