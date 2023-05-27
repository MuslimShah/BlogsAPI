require('express-async-errors');
require('dotenv').config();
const express = require('express');
const authRouts = require('../routes/auth');
const blogsRoutes = require('../routes/blogs');
const connectDB = require('../database/database');
const pageNotFound = require('../utils/page-not-found');
const errorHandler = require('../utils/error-handler');

module.exports = {
    express,
    authRouts,
    blogsRoutes,
    connectDB,
    pageNotFound,
    errorHandler
};