require('express-async-errors');
require('dotenv').config();
const express = require('express');
const authRouts = require('../routes/auth');
const blogsRoutes = require('../routes/blogs');
const connectDB = require('../database/database');
const pageNotFound = require('../utils/page-not-found');
const errorHandler = require('../utils/error-handler');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit')


module.exports = {
    express,
    authRouts,
    blogsRoutes,
    connectDB,
    pageNotFound,
    errorHandler,
    helmet,
    cors,
    xss,
    rateLimit
};