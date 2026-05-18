import mongoose from 'mongoose';

const habitLogSchema = new mongoose.Schema(
  {
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
      required: [true, 'Habit ID relationship is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID relationship is required'],
    },
    completedAt: {
      type: Date,
      required: [true, 'Completion date and time is required'],
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [200, 'Notes cannot exceed 200 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Performance Indexes
habitLogSchema.index({ habitId: 1 });
// Compound index to support superfast user analytics and progress heatmaps
habitLogSchema.index({ userId: 1, completedAt: -1 });

const HabitLog = mongoose.model('HabitLog', habitLogSchema);

export default HabitLog;
