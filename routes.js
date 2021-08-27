'use strict';

const express = require('express');
const router = express.Router();

const { asyncHandler } = require('./middleware/async-handler')

// User Routes
router.get('/users', asyncHandler(async(req, res) => {}))

router.post('/users', asyncHandler(async(req, res) => {}))

// Courses Routes
router.get('/courses/:id', asyncHandler(async(req, res) => {}))

router.post('/courses', asyncHandler(async(req, res) => {}))

router.put('/courses/:id', asyncHandler(async(req, res) => {}))

router.delete('/courses/delete', asyncHandler(async(req, res) => {}))

module.exports = router