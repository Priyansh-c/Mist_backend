const express = require('express');
const router = express.Router();
const CuisineSuggestion = require('../models/CuisineSuggestion');

// POST /api/suggestions - Submit cuisine suggestion
router.post('/', async (req, res) => {
  try {
    const {
      cuisineName,
      country,
      category,
      description,
      keyIngredients,
      popularDishes,
      culturalSignificance,
      suggestedBy,
      email
    } = req.body;
    
    const suggestion = new CuisineSuggestion({
      cuisineName,
      country,
      category,
      description,
      keyIngredients,
      popularDishes,
      culturalSignificance,
      suggestedBy,
      email
    });
    
    await suggestion.save();
    
    res.status(201).json({
      success: true,
      message: 'Cuisine suggestion submitted successfully',
      data: suggestion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting cuisine suggestion',
      error: error.message
    });
  }
});

// GET /api/suggestions - Get all suggestions
router.get('/', async (req, res) => {
  try {
    const suggestions = await CuisineSuggestion.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching suggestions',
      error: error.message
    });
  }
});

module.exports = router;