const express = require('express');
const router = express.Router();
const { saveJob, getSavedJobs, deleteSavedJob } = require('../controllers/savedController');
const { requireLogin } = require('../middleware/authMiddleware');

router.post('/', requireLogin, saveJob);
router.get('/', requireLogin, getSavedJobs);
router.delete('/:jobId', requireLogin, deleteSavedJob);

module.exports = router;
