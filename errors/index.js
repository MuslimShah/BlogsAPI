//import all custom errors here
const CustomAPIError = require('./custom-api-error');
const BadRequest = require('./bad-request');
const unAuthenticatedError = require('../errors/unAuthenticatedError');
const resourceNotFound = require('./notFond');

module.exports = {
    CustomAPIError,
    BadRequest,
    unAuthenticatedError,
    resourceNotFound
}