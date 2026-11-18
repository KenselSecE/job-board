const mongoose = require('mongoose');
const Application = require('../models/Application');

let applyForJob = async (req, res) => {
    try {
		console.log('applyForJob reached');
        console.log('session user:', req.session.user);
        console.log('body:', req.body);
        let { jobId, jobTitle, companyName, name, email, coverLetter } = req.body;
        if (!jobId || !jobTitle || !companyName || !name || !email) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        let userId = new mongoose.Types.ObjectId(req.session.user.id);
        let application = new Application({ userId, jobId, jobTitle, companyName, name, email, coverLetter });
        await application.save();
        res.status(201).json({ success: true, message: 'Application submitted successfully', data: application });
    } catch (err) {
        console.error('applyForJob error:', err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

let getMyApplications = async (req, res) => {
    try {
        let userId = new mongoose.Types.ObjectId(req.session.user.id);
        let applications = await Application.find({ userId });
        res.json({ success: true, data: applications });
    } catch (err) {
        console.error('getMyApplications error:', err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

module.exports = { applyForJob, getMyApplications };
