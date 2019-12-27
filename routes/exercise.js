const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Exercise = require('../models/exercise');

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get('/log', async (req, res) => {
    const userId = req.query.userId;
    const fromDate = req.query.from;
    const toDate = req.query.to;
    const limit = req.query.limit;

    if (!userId) return res.status(400).send('No user id given.');

    const user = await User.findById(userId);
    if (!user) return res.status(400).send('Invalid user id.');
    

    const queryConditions = {
        userId: userId
    };

    if (fromDate) {
        queryConditions.date = { $gte: fromDate };
    }

    if (toDate) {
        if (queryConditions.date)
            queryConditions.date.$lte = toDate;
        else 
            queryConditions.date = { $lte: toDate };
    }
    
    const log = await Exercise.find(queryConditions).limit(+limit);

    for (x in log) {
        log[x] = {
            description: log[x].description,
            duration: log[x].duration,
            date: log[x].date.toDateString()
        }
    }

    const result = {
        _id: user._id,
        username: user.username,
        count: log.length,
        log: log
    }

    res.send(result);
});

router.post('/new-user', async (req, res) => {
    let user = new User({
        username: req.body.username
    });
    await user.save();

    user = {
        _id: user._id,
        username: user.username
    }
    res.send(user);
});

router.post('/add', async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("Invalid user id.");

    let exercise = new Exercise({
        userId: req.body.userId,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    });

    await exercise.save();

    exercise = {
        username: user.username,
        description: exercise.description,
        duration: exercise.duration,
        _id: user._id,
        date: exercise.date.toDateString()
    }

    res.send(exercise);
});

module.exports = router;