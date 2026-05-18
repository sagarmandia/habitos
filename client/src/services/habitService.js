import api from './api';

/**
 * Service to execute REST requests for Habits.
 */
const createHabit = async (habitData) => {
  const response = await api.post('/habits', habitData);
  return response.data;
};

const getHabits = async (filters = {}) => {
  const response = await api.get('/habits', { params: filters });
  return response.data;
};

const getHabitById = async (id) => {
  const response = await api.get(`/habits/${id}`);
  return response.data;
};

const updateHabit = async (id, updateData) => {
  const response = await api.put(`/habits/${id}`, updateData);
  return response.data;
};

const deleteHabit = async (id) => {
  const response = await api.delete(`/habits/${id}`);
  return response.data;
};

const completeHabit = async (habitId, logData = {}) => {
  const response = await api.post(`/habits/${habitId}/logs`, logData);
  return response.data;
};

const getHabitLogs = async (habitId) => {
  const response = await api.get(`/habits/${habitId}/logs`);
  return response.data;
};

export default {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitLogs,
};
