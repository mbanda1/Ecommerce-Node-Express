const InsertClass = require('./insert');
const FetchClass = require('./fetch')
const UpdateClass = require('./update')
const DeleteClass = require('./delete')

module.exports = {
    ...InsertClass,
    ...FetchClass,
    ...UpdateClass,
    ...DeleteClass,
};

