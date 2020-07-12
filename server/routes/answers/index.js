const express = require('express');
const sanitize = require('mongo-sanitize');

const Answer = require('../../models/Answer');
const { authUser, validate } = require('../../middlewares');
const { ValidateAnswerQuestionForm } = require('../../utils/validation');
const logger = require('../../utils/logger');
const ERROR_MESSAGES = require('../../utils/errors');
const { isDuplicateKeyError } = require('../../utils/db');

const router = express.Router();

router.post('/', authUser, validate(ValidateAnswerQuestionForm), (req, res) => {
  const { content, questionId } = req.body;

  Answer.create({
    content: sanitize(content),
    questionId: sanitize(questionId),
    createdAt: new Date(),
    answeredBy: sanitize(res.locals.user.id),
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

router.get('/', async (req, res) => {
  const filterOptions = {
    questionId: sanitize(req.query.questionId),
  };
  const resObj = {};

  try {
    if (req.query.x !== 1) {
      const totalCount = await Answer.countDocuments(filterOptions).exec();
      resObj.c = totalCount;
    }
  } catch (err) {
    logger.error(err, 'count()', req);
    res.status(500).send(ERROR_MESSAGES.unknownError);
    return;
  }

  try {
    const answers = await Answer.find(
      filterOptions,
      'content questionId createdAt answeredBy',
      {
        sort: { createdAt: -1 },
        lean: true,
      },
    )
      .populate('answeredBy', 'username')
      .exec();

    resObj.v = answers.map((answer) => ({
      id: answer._id,
      content: answer.content,
      questionId: answer.questionId,
      createdAt: answer.createdAt,
      answeredBy: answer.answeredBy.username,
    }));

    res.json(resObj);
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      logger.error(err, 'Create Question', req);

      res.json({
        type: 'invalid',
        error: { title: ERROR_MESSAGES.duplicateQuestionError },
      });
    } else {
      logger.error(err, `Get ${req.params.questionId} Answers`, req);
      res.status(500).send(ERROR_MESSAGES.unknownError);
    }
  }
});

module.exports = router;
