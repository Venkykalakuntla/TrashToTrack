const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/ensureAuth');
const Waste = require('../models/waste');
 
// User dashboard - show submitted waste records
router.get('/', ensureAuth, async (req, res) => {
  try {
    const wasteList = await Waste.find({ reportedBy: req.session.user._id }).populate('reportedBy');
    // console.log(wasteList)
    res.render('userDashboard', { wasteList,user:req.user});
  } catch (err) {
          // console.log(err);
    res.status(500).send('Failed to load user dashboard');
  }
});

// Form to report new waste
router.get('/report', ensureAuth, (req, res) => {
  res.render('reportWaste');
});

// Handle form submission
router.post('/report', ensureAuth, async (req, res) => {
  const { type, quantity, location } = req.body;
  // console.log(req.session.user._id);
  try {
    const waste = new Waste({ type, quantity, location, reportedBy: req.session.user._id });
    let result=await waste.save();
    // console.log(result);

    res.redirect('/user');
  } catch (err) {
    res.status(400).send('Failed to report waste');
  }
});


router.get('/about',(req, res) => {
  res.render('about.ejs',{user:req.user});
});

router.get('/services',(req, res) => {
  res.render('services.ejs',{user:req.user});
});

module.exports = router;
