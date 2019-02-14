const InsertClass = require('./insert');
const FetchClass = require('./fetch')

module.exports = {
    ...InsertClass,
    ...FetchClass,
};

