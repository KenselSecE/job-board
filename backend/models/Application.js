const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications } = require('../controllers/applicationsController');
const { requireLogin } = require('../middleware/authMiddleware');

router.post('/', requireLogin, applyForJob);
router.get('/my', requireLogin, getMyApplications);

module.exports = router;
