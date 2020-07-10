import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Input } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import {
  LoginPageWrapper,
  LoginFormWrapper,
  LoginFormHeadSubtitle,
} from './styles';

function Login({ history }) {
  return (
    <LoginPageWrapper>
      <LoginFormWrapper>
        <Typography.Title level={2}>Login</Typography.Title>
        <Formik initialValues={{ email: '', password: '' }}>
          {(props) => (
            <Form>
              <Field
                name="email"
                component={Input}
                label="Email Address"
                type="text"
                autoComplete="on"
              />
              <ErrorMessage name="email" component="div" />
              <Field
                type="password"
                name="password"
                component={Input.Password}
              />
              <ErrorMessage name="password" component="div" />
              {/* <button type="submit" disabled={isSubmitting}>
                Submit
              </button> */}
            </Form>
          )}
        </Formik>
      </LoginFormWrapper>
    </LoginPageWrapper>
  );
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
