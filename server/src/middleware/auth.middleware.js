import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';

/**
 * Protect routes by validating JWT from the Authorization header.
 * Attaches verified user to the request object.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if Bearer token is sent in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token signature
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user from database and attach to request (exclude password)
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        throw new ApiError(401, 'Not authorized, user not found');
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(401, 'Not authorized, token verification failed');
    }
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }
});
