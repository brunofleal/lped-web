const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const router = require('./router');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const listEndpoints = require("express-list-endpoints");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
    console.log(listEndpoints(app));
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());


// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/api', router);


if (config.env === 'test') {
    console.log('Available routes:');
    console.log(listEndpoints(app));
}

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.use(express.static(path.resolve(__dirname, '../../frontend/build'))); // Serve frontend build

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});

/*
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found' + req.baseUrl));
});
 */

module.exports = app;
