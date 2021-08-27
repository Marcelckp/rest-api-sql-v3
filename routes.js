'use strict';

const express = require('express');
const router = express.Router();

// User Routes
router.get('/users', async(req, res) => {
    // res.json({ message: "here boy" })
})

router.post('/users', async(req, res) => {
    // req.headersSent = true
    // res.json({ message: "here boy" })
})

// Courses Routes
router.get('/courses/:id', async(req, res) => {
    // res.json({ message: "here boy" })
})

router.post('/courses', async(req, res) => {
    // res.json({ message: "here boy" })
})

router.put('/courses/:id', async(req, res) => {
    // res.json({ message: "here boy" })
})

router.delete('/courses/delete', async(req, res) => {
    // res.json({ message: "here boy" })
})

module.exports = router