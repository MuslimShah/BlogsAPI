const CustomAPIError = require('./custom-api-error');
const { StatusCodes } = require('http-status-codes');

class resourceNotFound extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
module.exports = resourceNotFound;