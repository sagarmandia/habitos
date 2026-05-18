import api from './api';

/**
 * Service to execute REST requests for Dashboard Analytics.
 */
const getStats = async () => {
  const response = await api.get('/analytics');
  return response.data;
};

export default {
  getStats,
};
