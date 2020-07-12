/* eslint-disable no-param-reassign */
const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');

const User = require('../../models/User');
const { validate } = require('../../middlewares');
const {
  ValidateRegisterForm,
  ValidateLoginForm,
} = require('../../utils/validation');
const { genUUIDv4, isDuplicateKeyError } = require('../../utils/db');
const { JWT_EXPIRY_DURATION } = require('../../utils/constants');
const logger = require('../../utils/logger');
const ERROR_MESSAGES = require('../../utils/errors');
const { JWT_SECRET } = require('../../configs');

const router = express.Router();

/**
 * Register for a new user
 */
router.post('/register', validate(ValidateRegisterForm), (req, res) => {
  const { username, email, password } = req.body;

  User.create({
    username: sanitize(username),
    email: sanitize(email),
    password: sanitize(password),
    jwtValidId: genUUIDv4(),
  })
    .then((user) => {
      logger.success(user, 'Register researcher', req);
      res.json({ type: 'success' });
    })
    .catch((err) => {
      if (isDuplicateKeyError(err)) {
        logger.error(err, 'Create researcher', req);
        console.log(
          'ERROR_MESSAGES.errorDuplicateEmail',
          ERROR_MESSAGES.duplicateEmailError,
        );
        res.json({
          type: 'invalid',
          error: { email: ERROR_MESSAGES.duplicateEmailError },
        });
      } else {
        logger.error(err, 'Create researcher', req);
        res.status(500).send(ERROR_MESSAGES.unknownError);
      }
    });
});

/**
 * Login
 */
router.post('/login', validate(ValidateLoginForm), (req, res) => {
  User.findOne({ email: sanitize(req.body.email) })
    .then((user) => {
      if (user === null) {
        res.json({
          type: 'invalid',
          error: {
            email: ERROR_MESSAGES.invalidEmailOrPasswordError,
            password: ERROR_MESSAGES.invalidEmailOrPasswordError,
          },
        });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((isMatched) => {
            if (!isMatched) {
              res.json({
                type: 'invalid',
                error: {
                  email: ERROR_MESSAGES.invalidEmailOrPasswordError,
                  password: ERROR_MESSAGES.invalidEmailOrPasswordError,
                },
              });
            } else {
              const token = jsonwebtoken.sign(
                {
                  id: user.id,
                  validId: user.jwtValidId,
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRY_DURATION },
              );
              res
                .cookie('token', token, { httpOnly: true })
                .cookie(
                  'user',
                  JSON.stringify({
                    username: user.username,
                    email: user.email,
                  }),
                )
                .json({ type: 'success' });
            }
          })
          .catch((err) => {
            logger.error(err, 'Bcrypt compare', req);
            res.status(500).send(ERROR_MESSAGES.unknownError);
          });
      }
    })
    .catch((err) => {
      logger.error(err, 'Find email', req);
      res.status(500).send(ERROR_MESSAGES.unknownError);
    });
});

/**
 * Log out current user
 */
router.get('/logout', (req, res) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  res.clearCookie('token', { httpOnly: true }).clearCookie('user');
  if (!token) {
    logger.logError('Probably already logged out', 'No token', req);
    res.json({
      type: 'msg',
      msg: 'You have already been logged out',
    });
  } else {
    jsonwebtoken.verify(token, JWT_SECRET, (err, decodedPayload) => {
      if (err) {
        logger.logError(err, 'Invalid token', req);
        res.json({
          type: 'msg',
          msg: 'You have already been logged out',
        });
      } else {
        // Revoke existing tokens
        User.findByIdAndUpdate(decodedPayload.id, { jwtValidId: genUUIDv4() })
          .then((existingUser) => {
            if (existingUser === null) {
              logger.logError(
                err,
                `Cannot find user (id: ${decodedPayload.id})`,
                req,
              );
              res.status(400).send(ERROR_MESSAGES.unknownError);
            } else {
              res.json({ type: 'success' });
            }
          })
          .catch((findByIdAndUpdateErr) => {
            logger.logError(findByIdAndUpdateErr, 'findByIdAndUpdate()', req);
            res.status(500).send(ERROR_MESSAGES.unknownError);
          });
      }
    });
  }
});

module.exports = router;
