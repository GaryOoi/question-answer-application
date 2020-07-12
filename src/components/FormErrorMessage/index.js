import React from 'react';
import { ErrorMessage } from 'formik';

import { StyledErrorMessage } from './styles';

function FormErrorMessage(props) {
  return <ErrorMessage {...props} component={StyledErrorMessage} />;
}

export default FormErrorMessage;
