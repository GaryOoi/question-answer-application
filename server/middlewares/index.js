const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');
const { JWT_SECRET } = require('../configs');
const {
  JWT_EXPIRY_DURATION,
  SECONDS_TO_REFRESH_JWT,
  REACT_DOMAIN,
} = require('../utils/constants');
const logger = require('../utils/logger');

function authUser(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    logger.error('No token', 'authUser', req);
    res.status(401).send('Please login to perform task.');
  } else {
    jsonwebtoken.verify(token, JWT_SECRET, (err, decodedPayload) => {
      if (err) {
        logger.error(err, 'authUser: Invalid token', req);
        res
          .clearCookie('token', { httpOnly: true })
          .clearCookie('user')
          .status(401)
          .send(
            'Sorry, you have been logged out automatically, please log in again',
          );
      } else {
        const currentSeconds = Math.floor(Date.now() / 1000);
        if (decodedPayload.exp - currentSeconds <= SECONDS_TO_REFRESH_JWT) {
          // Refresh token
          User.findById(decodedPayload.id)
            .then((user) => {
              if (user === null) {
                logger.error(
                  err,
                  `authUser: Cannot find user (id: ${decodedPayload.id})`,
                  req,
                );
                res
                  .clearCookie('token', { httpOnly: true })
                  .clearCookie('user')
                  .status(401)
                  .send(
                    'Sorry, you have been logged out automatically, please log in again',
                  );
              } else if (decodedPayload.validId !== user.jwtValidId) {
                logger.error(err, 'authUser: Token revoked', req);
                res
                  .clearCookie('token', { httpOnly: true })
                  .clearCookie('user')
                  .status(401)
                  .send(
                    'Sorry, you have been logged out automatically, please log in again',
                  );
              } else {
                const newToken = jsonwebtoken.sign(
                  {
                    id: user.id,
                    validId: user.jwtValidId,
                  },
                  JWT_SECRET,
                  { expiresIn: JWT_EXPIRY_DURATION },
                );
                res.cookie('token', newToken, { httpOnly: true }).cookie(
                  'user',
                  JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                  }),
                );
                res.locals.user = {
                  id: decodedPayload.id,
                };
                next();
              }
            })
            .catch((findByIdErr) => {
              logger.error(findByIdErr, 'authUser: findById()', req);
              res.status(500).send('Sorry, something went wrong');
            });
        } else {
          res.locals.user = {
            id: decodedPayload.id,
          };
          next();
        }
      }
    });
  }
}

function allowCORS(_req, res, next) {
  res.header('Access-Control-Allow-Origin', REACT_DOMAIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
}

function validate(validationFn) {
  function validationMiddleware(req, res, next) {
    try {
      const validationError = validationFn(
        req.method === 'GET' ? req.query : req.body,
      );
      if (Object.keys(validationError).length > 0) {
        res.json({ type: 'invalid', error: validationError });
      } else {
        next();
      }
    } catch (err) {
      logger.error(err, 'Validation', req);
      res.status(400).send('Sorry, please provide valid parameters');
    }
  }
  return validationMiddleware;
}

function cacheAsset(req, res, next) {
  res.header(
    'Cache-Control',
    req.originalUrl.startsWith('/static/') ? 'max-age=31536000' : 'no-cache',
  );
  next();
}

// FOR DEBUG ONLY
// eslint-disable-next-line no-unused-vars
function debug(req, res, next) {
  logger.log(`${req.method} ${req.originalUrl}`);

  next();

  // // Delay
  // const seconds = 5;
  // logger.log(chalk.bgWhite.black('Delay'), `${seconds} seconds ...`);
  // setTimeout(() => {
  //   logger.log(chalk.bgWhite.black('Resumed'));
  //   next();
  // }, seconds * 1000);

  // // Reject
  // logger.log(chalk.bgWhite.black('Reject'));
  // // res.status(500).send('errorUnknown');
  // res.json({ type: 'invalid', error: { age: 'Something wrong' } });
}

module.exports = {
  authUser,
  allowCORS,
  validate,
  cacheAsset,
  debug,
};
