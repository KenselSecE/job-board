const mongoose = require('mongoose');
const SavedJob = require('../models/SavedJob');

let saveJob = async (req, res) => {
    try {
        let { jobId, jobTitle, companyName, jobGeo } = req.body;
        let jobType = Array.isArray(req.body.jobType) ? req.body.jobType[0] : req.body.jobType;
        let userId = new mongoose.Types.ObjectId(req.session.user.id);

        let existing = await SavedJob.findOne({ userId, jobId });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Job already saved' });
        }
        let savedJob = new SavedJob({ userId, jobId, jobTitle, companyName, jobType, jobGeo });
        await savedJob.save();
        res.status(201).json({ success: true, message: 'Job saved successfully', data: savedJob });
    } catch (err) {
        console.error('saveJob error:', err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

let getSavedJobs = async (req, res) => {
    try {
        let userId = new mongoose.Types.ObjectId(req.session.user.id);
        let savedJobs = await SavedJob.find({ userId });
        res.json({ success: true, data: savedJobs });
    } catch (err) {
        console.error('getSavedJobs error:', err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

let deleteSavedJob = async (req, res) => {
    try {
        let userId = new mongoose.Types.ObjectId(req.session.user.id);
        await SavedJob.findOneAndDelete({ userId, jobId: req.params.jobId });
        res.json({ success: true, message: 'Job removed from saved' });
    } catch (err) {
        console.error('deleteSavedJob error:', err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

module.exports = { saveJob, getSavedJobs, deleteSavedJob };
