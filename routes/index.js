// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.render('home.ejs',{user:req.user});
});

module.exports = router;
