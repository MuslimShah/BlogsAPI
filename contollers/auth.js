const User = require('../models/user');
const { BadRequest, unAuthenticatedError } = require('../errors');
const StatusCodes = require('http-status-codes');

exports.register = async(req, res) => {
    const user = await User.create({...req.body });
    console.log({...req.body });
    const token = await user.createToken();
    res.status(StatusCodes.CREATED).json({ token, name: user.name });

}

//login
exports.login = (req, res, next) => {
    res.send('login');
}