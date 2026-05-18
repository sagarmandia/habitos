/**
 * Custom ApiError class extending native Error.
 * Standardizes the error response structure across the application.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode HTTP Status Code
   * @param {string} message Error message
   * @param {Array} errors Array of validation/detailed errors
   * @param {string} stack Error stack trace
   */
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
