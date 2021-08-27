'use strict';

const express = require('express');
const router = express.Router();

const { User, Course } = require('./models');
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require('./middleware/auth-user');

// User Routes
router.get('/users', asyncHandler(async(req, res) => {
    const user = req.currentUser;

    res.json({
        name: user.name,
        username: user.username
    })
}))

router.post('/users', asyncHandler(async(req, res) => {}))

// Courses Routes
router.get('/courses/:id', asyncHandler(async(req, res) => {}))

router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {}))

router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {}))

router.delete('/courses/delete', authenticateUser, asyncHandler(async(req, res) => {}))

module.exports = router