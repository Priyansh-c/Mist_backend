const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });
    
    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
});

// GET /api/contact - Get all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    });
  }
});

// PUT /api/contact/:id/status - Update message status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
});

module.exports = router;