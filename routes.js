'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const { User, Course } = require('./models');
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require('./middleware/auth-user');

// creates a router instance that acts on route /api/
const router = express.Router();

router.use(bodyParser.json());

// User Routes
router.get('/users', authenticateUser, asyncHandler(async(req, res) => {
    const user = req.currentUser;
    console.log(user);
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.emailAddress
    })
}))

router.post('/users', asyncHandler(async(req, res) => {
    console.log(req.body)
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
    const courses = await Course.findAll({
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
    })
    res.json({ courses });
}))

router.get('/courses/:id', asyncHandler(async(req, res) => {
    try {
        const course = await Course.findOne({
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

router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).location(`/courses/${course.id}`).end();
    } catch (e) {
        if (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError') {
            const errors = e.errors.map(err => err.message);
            res.status(400).json({ errors })
        } else {
            throw e;
        }
    }
}))

router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        const user = req.currentUser;
        console.log(user.id, course.userId)
        if (course.userId === user.id) {
            if (course) {
                await course.update(req.body);
                // course.title = req.body.title;
                // course.description = req.body.description;
                // course.estimatedTime = req.body.estimatedTime;
                // course.materialsNeeded = req.body.materialsNeeded;
                // await course.save();
                res.status(204).end()
            } else {
                res.status(404).json({ message: 'The course you want to update can not be found.' })
            }
        } else {
            res.status(403).json({ message: 'You don\'t have permission to edit this users courses only the owner can.' })
        }
    } catch (e) {
        if (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError') {
            const error = e.errors(err => err.message)
            res.status(400).json({ error })
        } else {
            throw e;
        }
    }


}))

router.delete('/courses/:id/delete', authenticateUser, asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id)
    const user = req.currentUser;

    if (user.id === course.userId) {
        if (course) {
            await course.destroy()
            res.status(204).end()
        } else {
            res.status(404).json({ message: 'The course you want to delete could not be found.' })
        }
    } else {
        res.status(403).json({
            message: 'You don\'t have permission to delete this course only the owner can.'
        })
    }
}))

module.exports = router