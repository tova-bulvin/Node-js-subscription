var express = require('express');
var router = express.Router();
const User = require('../models/user');
const emailService = require('../services/emailService')

/* Create user */
router.get('/', function(req, res, next) {
  res.render('users/new', { user: new User() });
});

router.post('/',async function(req, res, next) {
  let user = new User(req.body.firstName,req.body.lastName,req.body.country,req.body.phone,req.body.email);
  let recipientEmail = "tovi27818@gmail.com";
  try {
    await emailService.sendEmail(user,recipientEmail);
    res.redirect('users');
  } catch (error) {
    return next(error);
  }
  
});

module.exports = router;
