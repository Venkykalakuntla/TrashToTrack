const express = require('express');
const router = express.Router();
const Waste = require('../models/waste');
// const User=require("../models/user")
const { ensureAuth } = require('../middleware/ensureAuth'); // Import the function

// Show form
router.get('/report', ensureAuth, (req, res) => {
  res.render('wasteForm');
});

// Handle submission
router.post('/report', ensureAuth, async (req, res) => {
  const { type, quantity, location } = req.body;
    console.log(req.session.user._id);
    try {
      const waste = new Waste({ type, quantity, location, reportedBy: req.session.user._id });
      let result=await waste.save();
      console.log(result);
  
      res.redirect('/user');
    } catch (err) {
      res.status(400).send('Failed to report waste');
    }
});

module.exports = router;