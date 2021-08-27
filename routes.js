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

router.post('/users', asyncHandler(async(req, res) => {
    try {
        const user = await User.build(req.body);
        if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
        }
        await user.save()
        res.status(201).location('/').end()
    } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError' || e.name === 'SequelizeValidationError') {
            const errors = e.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw e;
        }
    }
}))

// Courses Routes
router.get('/courses', asyncHandler(async(req, res) => {
    try {
        const courses = Courses.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: User,
                as: 'user',
                attribute: {
                    exclude: ['password', 'createdAt', 'updatedAt ']
                }
            }]
        })
    } catch (e) {
        throw e
    }
}))

router.get('/courses/:id', asyncHandler(async(req, res) => {
    try {
        const course = Course.findOne({
            where: {
                id: req.params.id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            }]
        });
        if (course) {
            res.status(200).json({
                course
            })
        } else {
            res.status(404).json({ message: 'Course not found' });
            next()
        }
    } catch (e) {
        throw e;
    }
}))

router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {}))

router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {}))

router.delete('/courses/delete', authenticateUser, asyncHandler(async(req, res) => {}))

module.exports = router