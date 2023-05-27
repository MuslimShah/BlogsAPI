const User = require('../models/user');
const { BadRequest, unAuthenticatedError } = require('../errors');
const StatusCodes = require('http-status-codes');

//registering user
exports.register = async(req, res) => {
    const user = await User.create({...req.body });
    console.log({...req.body });
    const token = await user.createToken();
    res.status(StatusCodes.CREATED).json({ token, name: user.name });
}

//login user
exports.login = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest(`invalid credintials`);
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new unAuthenticatedError(`Invalid credintials`);
    }
    const isMatched = await user.comparePassword(password);
    console.log(isMatched);
    if (!isMatched) {
        throw new unAuthenticatedError('Invalid credintials');
    }
    //sending token to user...
    const token = await user.createToken();
    res.status(StatusCodes.OK).json({ token, name: user.name, msg: `user ${user.name} successfully logged in` })
}