/**
 * A wrapper to handle asynchronous middleware/route handler errors.
 * Passes any caught error to the next express middleware (error handler).
 * 
 * @param {Function} fn The asynchronous express function
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
