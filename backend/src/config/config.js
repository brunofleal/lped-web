const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(8000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
        STRATZ_API_TOKEN: Joi.string().required().description('Stratz api token'),
        ADMIN_AUTH_TOKEN: Joi.string().required().description('admin pass'),
        STEAM_API_KEY: Joi.string().required().description('admin pass'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    },
    stratz: {
        token: envVars.STRATZ_API_TOKEN
    },
    auth: {
        token: envVars.ADMIN_AUTH_TOKEN
    },
    steam: {
        token: envVars.STEAM_API_KEY
    }
};
