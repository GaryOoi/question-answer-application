const ERROR_MESSAGES = require('./errors');

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/]).{8,30}$/;

// Different from client-side validation
const ValidateRegisterForm = (values) => {
  const errors = {};
  if (values.username === '') {
    errors.username = '* Required';
  }

  if (values.email.length === 0) {
    errors.email = ERROR_MESSAGES.requiredError;
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = ERROR_MESSAGES.invalidEmailError;
  }

  if (values.password.length === 0) {
    errors.password = ERROR_MESSAGES.requiredError;
  } else if (!PASSWORD_REGEX.test(values.password)) {
    console.log('error heree----');
    errors.password = ERROR_MESSAGES.invalidPasswordError;
  }

  console.log('errors', errors);

  return errors;
};

const ValidateLoginForm = (values) => {
  const errors = {};
  if (values.email.length === 0) {
    errors.email = ERROR_MESSAGES.requiredError;
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = ERROR_MESSAGES.invalidEmailError;
  }
  if (values.password.length === 0) {
    errors.password = ERROR_MESSAGES.requiredError;
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.password = ERROR_MESSAGES.invalidPasswordError;
  }
  return errors;
};

const ValidateAskQuestionForm = (values) => {
  const errors = {};
  if (values.title.length === 0) {
    errors.title = ERROR_MESSAGES.requiredError;
  }

  if (values.content.length === 0) {
    errors.content = ERROR_MESSAGES.requiredError;
  }

  if (values.programmingLanguage.length === 0) {
    errors.programmingLanguage = ERROR_MESSAGES.requiredError;
  }

  return errors;
};

const ValidateAnswerQuestionForm = (values) => {
  const errors = {};

  if (values.content.length === 0) {
    errors.content = ERROR_MESSAGES.requiredError;
  }

  return errors;
};

module.exports = {
  ValidateRegisterForm,
  ValidateLoginForm,
  ValidateAskQuestionForm,
  ValidateAnswerQuestionForm,
};
