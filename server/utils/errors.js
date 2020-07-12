const ERROR_MESSAGES = {
  // Server errors
  internetConnectionError:
    'Sorry, please check your internet connection and try again',

  unknownError: 'Sorry, something went wrong',

  invalidParametersError: 'Sorry, please provide valid parameters',

  notLoggedInError: 'Please log in to access this page',

  invalidTokenError:
    'Sorry, you have been logged out automatically, please log in again',

  unauthorizedError: 'Sorry, you are not authorized to access this page',

  invalidConfigStateError: 'Sorry, this function is unavailable currently',

  duplicateEmailError: 'This email address is already registered',

  invalidEmailOrPasswordError:
    'Sorry, the email address and/or password are incorrect',

  invalidPasswordError:
    'Please enter a valid password (8 - 30 characters with at least one alphabet, one number and one special character)',

  wrongPasswordError: 'Please enter the correct password',

  userNotFoundError: 'Sorry, the user cannot be found',

  duplicateQuestionError:
    'This question has been asked. Kindly find in Q&A Forum.',

  methodNotAllowedError: 'Sorry, actions are not allowed',

  emailError:
    'Sorry, email cannot be sent, please check your email and try again.',

  messageAlreadyLoggedOutError: 'You have already been logged out',

  requiredError: '* Required',

  invalidValueError: 'Sorry, you have entered an invalid value',

  invalidEmailError: 'Please enter a valid email address',
};

module.exports = ERROR_MESSAGES;
