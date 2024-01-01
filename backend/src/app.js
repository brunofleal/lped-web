const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const config = require('./config/config');
const morgan = require('./config/morgan');
const router = require('./router');
const { errorConverter, errorHandler } = require('./middlewares/error');
const listEndpoints = require("express-list-endpoints");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

const BASE_URL = config.prodUrl ? config.prodUrl : `http://localhost:${config.env == 'production' ? config.port : config.clientPort}`;
console.log({ BASE_URL });
console.log({ config });

passport.use(new SteamStrategy({
    returnURL: `${BASE_URL}/signup`,
    realm: BASE_URL,
    apiKey: config.steam.token
},
    function (identifier, profile, done) {
        User.findByOpenID({ openId: identifier }, function (err, user) {
            return done(err, user);
        });
    }
));


if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
    console.log(listEndpoints(app));
}

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// set security HTTP headers
app.use(helmet({
    contentSecurityPolicy: false
}));
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
