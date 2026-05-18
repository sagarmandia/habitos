import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Habit title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      lowercase: true,
      trim: true,
      enum: {
        values: ['mindfulness', 'growth', 'health', 'fitness', 'finance', 'other'],
        message: '{VALUE} is not a valid category',
      },
    },
    frequency: {
      type: String,
      required: [true, 'Frequency is required'],
      lowercase: true,
      trim: true,
      enum: {
        values: ['daily', 'weekly', 'monthly'],
        message: '{VALUE} is not a valid frequency',
      },
    },
    targetCount: {
      type: Number,
      required: [true, 'Target completed count is required'],
      min: [1, 'Target count must be at least 1'],
      default: 1,
    },
    streak: {
      type: Number,
      min: [0, 'Streak count cannot be negative'],
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID relationship is required'],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Performance Indexes
habitSchema.index({ userId: 1 });
habitSchema.index({ userId: 1, isArchived: 1 }); // Optimize active habit queries

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
