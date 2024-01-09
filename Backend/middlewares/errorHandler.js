const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  console.log(error);

  if (error.message === 'invalid_credential') {
    statusCode = 401;
    message = 'Invalid Email/Password';
  }

  if (error.name === 'JsonWebTokenError' || error.message === 'unauthorized') {
    statusCode = 401;
    message = 'Please login first';
  }

  if (error.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = error.erros[0].message;
  }

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;
