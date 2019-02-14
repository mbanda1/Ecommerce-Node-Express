const logger = require('../tools/logger');

module.exports = (error, req, res, next) => {
    if ((error instanceof Error)) {
        logger.error({ error: error.toString(), reqSource: req.protocol + '://' + req.get('host') + req.originalUrl });
        res.status(error.status || 500);
        res.json({
            error: { message: 'An error happened while processing, probably check your json' }
        });
    } else {
        next();
    }
}