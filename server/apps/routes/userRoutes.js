
const express = require('express');
const user = require('../controllers/userController');

const router = express.Router();

//user routes for get profile and book history
router.get('/profile',user.getUserProfile);
router.get('/myBook', user.getMyBook);
router.post('/feedback', user.feedbackCreate);
router.post('/applyBook', user.applyBook);

module.exports = router;