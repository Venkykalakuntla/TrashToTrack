// routes/company.js
const express = require('express');
const router = express.Router();
const Request = require('../models/request');
const Waste = require('../models/waste');
const { ensureCompany } = require('../middleware/ensureAuth');

// Middleware to ensure company access
// function ensureCompany(req, res, next) {
//   if (req.session.user && req.session.user.role === 'company')
//     {
//       // console.log(req.session.user);
//       req.user=req.session.user;
//       // console.log(req.user);
//       return next();
//     }
//   res.redirect('/auth/login');
// }

// Company dashboard
router.get('/', ensureCompany, async (req, res) => {
  // try {
  //   const requests = await Request.find({ company: req.session.user._id });
  //   res.render('companyDashboard', { user: req.session.user, requests });
  // } catch (err) {
  //   res.status(500).send('Error loading dashboard');
  // }
     res.redirect("/company/dashboard")
});

router.get('/request', ensureCompany, (req, res) => {
  res.render('createRequest.ejs');
});


// Submit waste collection request
router.post('/request', ensureCompany, async (req, res) => {
  // console.log(req.user._id);
  
  const { type, quantity } = req.body;
  const request = new Request({
    company: req.user._id,
    type,
    quantity,
    status: 'Pending'
  });

  let result=await request.save();
  // console.log(result);

  res.redirect('/company/dashboard');
});

// Company dashboard - view own requests and pickup info
router.get('/dashboard', ensureCompany, async (req, res) => {
  try {
    // console.log(req.user._id);

    const requests = await Request.find({ company: req.user._id }).populate('company');

    // console.log(requests)

    // Populate assignedWaste manually
    const populatedRequests = await Promise.all(
      requests.map(async (reqItem) => {
        // console.log(`Request ID: ${reqItem._id}`); // Debugging

        const assignedWaste = await Waste.findOne({ assignedTo: reqItem._id });
        // console.log(`Assigned Waste: ${assignedWaste}`); // Debugging

        return {
          ...reqItem.toObject(),
          assignedWaste,
        };
      })
    );

    // console.log(populatedRequests);

    res.render('companyDashboard', { user: req.user, requests: populatedRequests });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

module.exports = router;