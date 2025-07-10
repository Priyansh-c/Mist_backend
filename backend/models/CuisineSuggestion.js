const mongoose = require('mongoose');

const cuisineSuggestionSchema = new mongoose.Schema({
  cuisineName: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  keyIngredients: {
    type: [String],
    required: true
  },
  popularDishes: {
    type: [String],
    required: true
  },
  culturalSignificance: {
    type: String,
    trim: true
  },
  suggestedBy: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CuisineSuggestion', cuisineSuggestionSchema);