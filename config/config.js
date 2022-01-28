const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number()
    .default(8081),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_URL: Joi.string().required()
    .description('Mongo DB host url'),
}).unknown()
  .required();

const envVars = Joi.attempt(process.env, envVarsSchema);
console.log("value", envVars)
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongoUrl: envVars.MONGO_URL
};

module.exports = config;
