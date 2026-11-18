require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users');
const applicationRoutes = require('./routes/applications');
const savedRoutes = require('./routes/saved');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB error:', err));

app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/saved', savedRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Job Board API running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});