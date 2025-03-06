const express = require('express');
const taskRoutes = require('./tasks');

const router = express.Router();

// Task routes
router.use('/tasks', taskRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = router;