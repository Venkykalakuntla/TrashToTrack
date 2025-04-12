// routes/admin.js
const express = require('express');
const router = express.Router();
const Waste = require('../models/waste');
const Request = require('../models/request');
const { ensureAuth, ensureAdmin } = require('../middleware/ensureAuth');

// Admin dashboard - view all waste and requests
router.get('/', ensureAuth, ensureAdmin, async (req, res) => {
  try {
    const wasteList = await Waste.find().populate('reportedBy');
    // console.log("wastelists:",wasteList);

    const companyRequests = await Request.find().populate('company');
    // console.log("companyrequests:",companyRequests);

    res.render('adminDashboard', { wasteList, companyRequests });

  } catch (err) {
    res.status(500).send('Failed to load admin dashboard');
  }
});

// View specific request and match available waste
router.get('/assign/:requestId', ensureAuth, ensureAdmin, async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId).populate('company');
    const availableWaste = await Waste.find({ assignedTo: null, type: request.type });

    // console.log("request:",request)
    // console.log("available:",availableWaste)

    res.render('assignWaste', { request, availableWaste });
  } catch (err) {
    res.status(500).send('Failed to load assignment view');
  }
});

// Assign waste to request
router.post('/assign/:requestId', ensureAuth, ensureAdmin, async (req, res) => {
  try {
    const wasteId = req.body.wasteId;
    // console.log(wasteId)
    
    await Request.findByIdAndUpdate(req.params.requestId,{assignedWaste:"assigned"},{new:true});
    // console.log(companyRequest)

    await Waste.findByIdAndUpdate(wasteId, { assignedTo: req.params.requestId });


    res.redirect('/admin');
  } catch (err) {
    res.status(500).send('Assignment failed');
  }
});

module.exports = router;
