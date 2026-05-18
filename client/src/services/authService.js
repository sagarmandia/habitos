import api from './api';

/**
 * Service to manage authentication requests to the Express backend APIs.
 */
const authService = {
  /**
   * Register a new user.
   * 
   * @param {string} name User full name
   * @param {string} email User email address
   * @param {string} password User password
   * @returns {Promise<Object>} Response data
   */
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  /**
   * Login a user.
   * 
   * @param {string} email User email address
   * @param {string} password User password
   * @returns {Promise<Object>} Response data
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Retrieve current authenticated user profile.
   * 
   * @returns {Promise<Object>} Response data
   */
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;
