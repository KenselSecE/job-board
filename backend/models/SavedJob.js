const mongoose = require('mongoose');

let savedJobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    jobType: { type: String },
    jobGeo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SavedJob', savedJobSchema);
