const express = require('express');
const sanitize = require('mongo-sanitize');

const Question = require('../../models/Question');
const { authUser, validate } = require('../../middlewares');
const { ValidateAskQuestionForm } = require('../../utils/validation');
const logger = require('../../utils/logger');
const ERROR_MESSAGES = require('../../utils/errors');
const { isDuplicateKeyError } = require('../../utils/db');

const router = express.Router();

router.get('/', async (req, res) => {
  const filterOptions = {};

  if (req.query.programmingLanguage) {
    filterOptions.programmingLanguage = sanitize(req.query.programmingLanguage);
  }

  const pageOptions = {
    number: sanitize(req.query.p) - 1 || 0,
    size: sanitize(req.query.c) || 5,
  };

  const resObj = {};
  try {
    if (req.query.x !== 1) {
      const totalCount = await Question.countDocuments(filterOptions).exec();
      resObj.c = totalCount;
    }
  } catch (err) {
    logger.error(err, 'count()', req);
    res.status(500).send(ERROR_MESSAGES.unknownError);
    return;
  }

  try {
    const questions = await Question.aggregate([
      { $match: filterOptions },
      {
        $lookup: {
          from: 'answers',
          localField: 'questionId',
          foreignField: 'questionId',
          as: 'answers',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'askedBy',
          foreignField: '_id',
          as: 'askedBy',
        },
      },
      {
        $project: {
          questionId: true,
          title: true,
          content: true,
          programmingLanguage: true,
          'askedBy.username': true,
          createdAt: true,
          answers: { $size: '$answers' },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $skip: pageOptions.number * pageOptions.size,
      },
      {
        $limit: pageOptions.size,
      },
    ]).exec();

    resObj.v = questions.map((question) => ({
      id: question.id,
      questionId: question.questionId,
      title: question.title,
      content: question.content,
      programmingLanguage: question.programmingLanguage,
      askedBy: question.askedBy[0].username,
      createdAt: question.createdAt,
      answers: question.answers,
    }));
    console.log('resObj', resObj);
    res.json(resObj);
  } catch (err) {
    logger.error(err, 'find() and populate()', req);
    res.status(500).send(ERROR_MESSAGES.unknownError);
  }
});

router.post('/', authUser, validate(ValidateAskQuestionForm), (req, res) => {
  const { title, content, programmingLanguage } = req.body;

  Question.create({
    questionId: sanitize(title.toLowerCase().split(' ').slice(0, 10).join('_')),
    title: sanitize(title),
    content: sanitize(content),
    programmingLanguage: sanitize(programmingLanguage),
    createdAt: new Date(),
    askedBy: sanitize(res.locals.user.id),
  })
    .then((question) => {
      logger.success(question.title, 'Create question', req);
      res.json({ type: 'success' });
    })
    .catch((err) => {
      if (isDuplicateKeyError(err)) {
        logger.error(err, 'Create Question', req);

        res.json({
          type: 'invalid',
          error: { title: ERROR_MESSAGES.duplicateQuestionError },
        });
      } else {
        logger.error(err, 'Create researcher', req);
        res.status(500).send(ERROR_MESSAGES.unknownError);
      }
    });
});

module.exports = router;
