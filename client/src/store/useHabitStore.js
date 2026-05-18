import { create } from 'zustand';
import habitService from '../services/habitService';
import analyticsService from '../services/analyticsService';

const useHabitStore = create((set, get) => ({
  habits: [],
  analytics: null,
  isLoading: false,
  error: null,

  fetchHabits: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await habitService.getHabits(filters);
      if (response && response.success) {
        set({ habits: response.data.habits, isLoading: false });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to fetch habits',
        isLoading: false,
      });
    }
  },

  fetchAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await analyticsService.getStats();
      if (response && response.success) {
        set({ analytics: response.data, isLoading: false });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to fetch dashboard stats',
        isLoading: false,
      });
    }
  },

  addHabit: async (habitData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await habitService.createHabit(habitData);
      if (response && response.success) {
        const newHabit = response.data.habit;
        set((state) => ({
          habits: [newHabit, ...state.habits],
          isLoading: false,
        }));
        // Refresh analytics in background to include new counts
        get().fetchAnalytics();
        return { success: true };
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create habit';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  archiveHabit: async (habitId) => {
    try {
      const response = await habitService.updateHabit(habitId, { isArchived: true });
      if (response && response.success) {
        set((state) => ({
          habits: state.habits.filter((h) => h._id !== habitId),
        }));
        get().fetchAnalytics();
      }
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to archive habit' });
    }
  },

  deleteHabit: async (habitId) => {
    try {
      const response = await habitService.deleteHabit(habitId);
      if (response && response.success) {
        set((state) => ({
          habits: state.habits.filter((h) => h._id !== habitId),
        }));
        get().fetchAnalytics();
      }
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to delete habit' });
    }
  },

  /**
   * Optimistic completion log toggler.
   * Instantly increments the streak & updates today's completed stats.
   * Rolls back safely if the network request fails or duplicate logs are rejected.
   */
  toggleComplete: async (habitId, notes = '') => {
    // 1. Capture snapshots of current states for rollback
    const previousHabits = [...get().habits];
    const previousAnalytics = get().analytics ? { ...get().analytics } : null;

    // 2. Perform optimistic UI updates locally
    const updatedHabits = previousHabits.map((habit) => {
      if (habit._id === habitId) {
        // If already completed today, we don't want to increment again optimistically
        if (habit.completedToday) return habit;

        return {
          ...habit,
          streak: habit.streak + 1,
          completedToday: true, // Local tracking flag
        };
      }
      return habit;
    });

    let updatedAnalytics = null;
    if (previousAnalytics) {
      const currentCompleted = previousAnalytics.data.metrics.completedToday;
      const totalHabits = previousAnalytics.data.metrics.totalHabits;
      
      // Calculate optimistic completion percentage
      const totalExpected = totalHabits * 7;
      let newCompletionRate = previousAnalytics.data.metrics.completionRate;
      if (totalExpected > 0) {
        // Simple increment logic representing 1 more log
        newCompletionRate = Math.min(
          100,
          Math.round(((currentCompleted + 1) / totalExpected) * 100 * 7) // Scale back to 7-day rate metric roughly
        );
      }

      updatedAnalytics = {
        ...previousAnalytics,
        data: {
          ...previousAnalytics.data,
          metrics: {
            ...previousAnalytics.data.metrics,
            completedToday: currentCompleted + 1,
            // Adjust highestStreak optimistically
            highestStreak: Math.max(
              previousAnalytics.data.metrics.highestStreak,
              (previousHabits.find((h) => h._id === habitId)?.streak || 0) + 1
            ),
          },
        },
      };
    }

    // Apply optimistic updates instantly
    set({
      habits: updatedHabits,
      analytics: updatedAnalytics,
      error: null,
    });

    // 3. Fire API request in the background
    try {
      const response = await habitService.completeHabit(habitId, { notes });
      if (response && response.success) {
        const actualStreak = response.data.streak;
        
        // Sync habit with actual streak returned from server
        set((state) => ({
          habits: state.habits.map((h) =>
            h._id === habitId ? { ...h, streak: actualStreak, completedToday: true } : h
          ),
        }));

        // Refresh analytics in background to pull actual averages and history
        get().fetchAnalytics();
      }
    } catch (err) {
      // 4. Rollback to original state if API throws an error
      const apiErrorMsg = err.response?.data?.message || 'Failed to complete habit';
      
      set({
        habits: previousHabits,
        analytics: previousAnalytics,
        error: apiErrorMsg,
      });

      // Bubble up the error if the component needs to handle it locally (e.g. alerts)
      throw new Error(apiErrorMsg);
    }
  },

  clearError: () => set({ error: null }),
}));

export default useHabitStore;
