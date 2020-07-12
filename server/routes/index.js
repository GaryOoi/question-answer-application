const express = require('express');

const users = require('./users');
const answers = require('./answers');
const questions = require('./questions');

const router = express.Router();

router.use('/users', users);
router.use('/answers', answers);
router.use('/questions', questions);

module.exports = router;
