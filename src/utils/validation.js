const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
// Password validation regex adapted from https://www.regextester.com/97402 and
//  https://www.regextester.com/94488
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/]).{8,30}$/;

export const validateLoginForm = (values) => {
  const errors = {};

  if (values.email.length === 0) {
    errors.email = '* Required';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (values.password.length === 0) {
    errors.password = '* Required';
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.password =
      'Please enter a valid password (8 - 30 characters with at least one alphabet, one number and one special character)';
  }
  return errors;
};

export const validateRegisterForm = (values) => {
  const errors = {};

  if (values.username.length === 0) {
    errors.username = '* Required';
  }

  if (values.email.length === 0) {
    errors.email = '* Required';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (values.password.length === 0) {
    errors.password = '* Required';
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.password =
      'Please enter a valid password (8 - 30 characters with at least one alphabet, one number and one special character)';
  }
  return errors;
};

export const validateAskQuestionForm = (values) => {
  const errors = {};

  if (values.title.length === 0) {
    errors.title = '* Required';
  }

  if (values.content.length === 0) {
    errors.content = '* Required';
  }

  if (values.programmingLanguage.length === 0) {
    errors.programmingLanguage = '* Required';
  }

  return errors;
};

export const validateAnswerForm = (values) => {
  const errors = {};

  if (values.content.length === 0) {
    errors.content = '* Required';
  }

  return errors;
};
