/* eslint-disable no-console */
const chalk = require('chalk');

const logger = {
  log: console.log,
  var: (name, value) => {
    console.log(
      chalk.bgBlue.black(name),
      typeof value,
      chalk.blue(typeof value === 'object' ? JSON.stringify(value) : value),
    );
  },
  success: (message, tag, req) => {
    let prefix = 'Success';
    if (req) {
      prefix += ` (url: ${req.originalUrl})`;
    }
    if (tag) {
      prefix += ` (${tag})`;
    }
    console.log(
      chalk.bgGreen.black(`${prefix}:`),
      chalk.green(
        typeof message === 'object' ? JSON.stringify(message) : message,
      ),
    );
  },
  error: (error, tag, req) => {
    let prefix = 'Error';
    if (req) {
      prefix += ` (url: ${req.originalUrl})`;
    }
    if (tag) {
      prefix += ` (${tag})`;
    }
    console.error(
      chalk.bgRed.black(`${prefix}:`),
      chalk.red(
        typeof error === 'object' && error !== null && error.name === undefined
          ? JSON.stringify(error)
          : error,
      ),
    );
  },
};

module.exports = logger;
