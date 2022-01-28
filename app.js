const createError = require('http-errors');
const express = require('express');
const { ValidationError } = require('express-validation');
const bodyParser = require('body-parser');
const UnauthorizedError = require('express-jwt').UnauthorizedError;

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const threadRouter = require('./routes/thread');

// const authHandler = require('./helpers/auth-handler');

const app = express();



app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  res.header('Access-Control-Max-Age', '1000');
  next();
});

app.options('*', (req, res, next) => {
  res.sendStatus(200);
});

// app.use(authHandler);

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/threads', threadRouter);

//catch errors
// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.details.body.map(error => error.message).join(' and ');
    const error = createError(401, unifiedErrorMessage);
    return next(error);
  } else if (err instanceof UnauthorizedError) {
    const apiError = createError(400, err.message);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = createError(404, 'API not found.');
  return next(err);
});

//send errors
app.use((err, req, res, next) => {
  console.log('Error', err);
  if (err.status) {
    res.status(err.status).json({
      message: err.message
    });
  } else {
    res.status(500).json({ message: 'Somthing went wrong' });
  }
});

module.exports = app;
