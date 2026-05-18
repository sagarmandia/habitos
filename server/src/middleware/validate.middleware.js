import ApiError from '../utils/ApiError.js';

/**
 * Middleware to validate request data against a Joi schema.
 * 
 * @param {Object} schema Joi validation schema
 * @param {string} source Source of data to validate ('body', 'query', 'params')
 * @returns {Function} Express middleware function
 */
const validate = (schema, source = 'body') => (req, res, next) => {
  const dataToValidate = req[source];

  if (!schema) {
    return next();
  }

  const { value, error } = schema.validate(dataToValidate, {
    abortEarly: false, // Include all errors, not just the first one
    allowUnknown: true, // Allow unknown keys
    stripUnknown: true, // Remove unknown keys from the validated object
  });

  if (error) {
    const errorDetails = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/['"]/g, ''),
    }));

    return next(new ApiError(400, 'Validation failed', errorDetails));
  }

  // Replace req[source] with the validated and cleaned values
  req[source] = value;
  next();
};

export default validate;
