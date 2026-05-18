import ApiError from '../utils/ApiError.js';

/**
 * Global centralized error handling middleware for Express.
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Check if error is an instance of ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error.errors || [], err.stack);
  }

  // Handle MongoDB duplicate key error (11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `User with this ${field} already exists.`;
    error = new ApiError(400, message);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid authentication token');
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Authentication token has expired');
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {})
  };

  res.status(error.statusCode || 500).json(response);
};

export default errorHandler;
