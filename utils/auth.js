const jwt = require('jsonwebtoken');
const { unAuthenticatedError } = require('../errors');

//auth middleWare for route specific middlewaers
const auth = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new unAuthenticatedError(`Invalid credintials`);
    }
    const token = authHeader.split(' ')[1];
    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payLoad.userId, name: payLoad.name };
        next();
    } catch (err) {
        throw new unAuthenticatedError('Invalid Authentication');
    }

}