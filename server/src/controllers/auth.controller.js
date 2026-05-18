import authService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const result = await authService.registerUser({ name, email, password });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

/**
 * @desc    Authenticate user and get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.loginUser({ email, password });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User profile retrieved successfully',
    data: {
      user: req.user,
    },
  });
});
