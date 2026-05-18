import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

/**
 * Generate a JWT access token for a given user ID.
 * 
 * @param {string} userId User Database ID
 * @returns {string} Signed JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * Register a new user in the database.
 * 
 * @param {Object} userData Name, Email, Password
 * @returns {Object} User details and JWT token
 */
const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Create new user (pre-save hook hashes password)
  const user = await User.create({
    name,
    email,
    password,
  });

  // Convert to object and strip password field
  const userResponse = user.toObject();
  delete userResponse.password;

  const token = generateToken(user._id);

  return {
    user: userResponse,
    token,
  };
};

/**
 * Authenticate a user with email and password.
 * 
 * @param {Object} credentials Email and Password
 * @returns {Object} User details and JWT token
 */
const loginUser = async ({ email, password }) => {
  // Find user by email and explicitly select password field
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Verify password using instance method
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Convert to object and strip password field
  const userResponse = user.toObject();
  delete userResponse.password;

  const token = generateToken(user._id);

  return {
    user: userResponse,
    token,
  };
};

export default {
  generateToken,
  registerUser,
  loginUser,
};
