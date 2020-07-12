const bcrypt = require('bcrypt');

const logger = require('./logger');
const { BCRYPT_SALT_OR_ROUNDS } = require('../configs');

const createPasswordHashingPreSaveHook = (passwordFieldName) =>
  // Arrow function cannot be used, otherwise "this" will not be bound correctly
  // eslint-disable-next-line func-names
  function (next) {
    if (
      this[passwordFieldName] &&
      (this.isNew || this.isModified(passwordFieldName))
    ) {
      const thisDoc = this;
      bcrypt.hash(
        thisDoc[passwordFieldName],
        BCRYPT_SALT_OR_ROUNDS,
        (error, hashedPassword) => {
          if (error) {
            next(error);
          } else {
            thisDoc[passwordFieldName] = hashedPassword;
            next();
          }
        },
      );
    } else {
      next();
    }
  };

// Modified from https://gist.github.com/jed/982883
const genUUIDv4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (placeholderHexDigit) =>
      (
        placeholderHexDigit ^ // eslint-disable-line no-bitwise
        // eslint-disable-next-line no-bitwise
        ((Math.random() * 16) >> (placeholderHexDigit / 4))
      ).toString(16),
  );

const isDuplicateKeyError = (error) =>
  error.name === 'MongoError' && error.code === 11000;

/**
 * Generate mongoose sort object from req.query
 *
 * @param {object} req                     Express request object
 * @param {object} allowedFieldsToDefaults Mongoose sort object (field => 1|-1|null) (null: exclude if not specified)
 *
 * @returns {object} Mongoose sort object
 */
const parseSortQueryParams = (req, allowedFieldsToDefaults) => {
  try {
    const querySort = {};
    const allowedFieldsToDefaultsCopy = { ...allowedFieldsToDefaults };
    if (req.query.s) {
      if (Array.isArray(req.query.s)) {
        req.query.s.forEach((sortCriterion) => {
          const sortField =
            sortCriterion[0] === '-' ? sortCriterion.slice(1) : sortCriterion;
          if (allowedFieldsToDefaultsCopy[sortField] !== undefined) {
            querySort[sortField] = sortCriterion[0] === '-' ? -1 : 1;
          }
          delete allowedFieldsToDefaultsCopy[sortField];
        });
      } else {
        const sortField =
          req.query.s[0] === '-' ? req.query.s.slice(1) : req.query.s;
        if (allowedFieldsToDefaultsCopy[sortField] !== undefined) {
          querySort[sortField] = req.query.s[0] === '-' ? -1 : 1;
        }
        delete allowedFieldsToDefaultsCopy[sortField];
      }
    }
    Object.keys(allowedFieldsToDefaultsCopy).forEach((sortField) => {
      if (allowedFieldsToDefaultsCopy[sortField] !== null) {
        querySort[sortField] = allowedFieldsToDefaultsCopy[sortField];
      }
    });
    return querySort;
  } catch (error) {
    logger.error(error, 'parseSortQueryParams()', req);
    const querySort = {};
    Object.keys(allowedFieldsToDefaults).forEach((sortField) => {
      if (allowedFieldsToDefaults[sortField] !== null) {
        querySort[sortField] = allowedFieldsToDefaults[sortField];
      }
    });
    return querySort;
  }
};

module.exports = {
  createPasswordHashingPreSaveHook,
  genUUIDv4,
  isDuplicateKeyError,
  parseSortQueryParams,
};
