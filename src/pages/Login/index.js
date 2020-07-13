import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, Input } from "antd";
import { Formik, Field, message } from "formik";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import {
  createFormikCompatibleComponent,
  createSubmitHandler,
} from "utils/formik";
import { createCancellableRequestAPI } from "utils/request";
import { validateLoginForm } from "utils/validation";
import FormErrorMessage from "components/FormErrorMessage";
import {
  LoginPageWrapper,
  LoginFormWrapper,
  StyledForm,
  FieldTitle,
  BottomMarginFieldWrapper,
  SubmitButton,
  RegisterAccountWrapper,
} from "./styles";

const FormikCompatibleComponents = {
  InputEmail: createFormikCompatibleComponent(Input, false),
  InputPassword: createFormikCompatibleComponent(Input.Password, false),
};

const [
  cancellableLoginRequestAPI,
  cancelLoginRequestAPI,
] = createCancellableRequestAPI();

function Login() {
  const history = useHistory();

  const onSuccess = () => {
    message.success("You have been successfully login");
    history.push("/");
  };

  const handleSubmit = createSubmitHandler(
    cancellableLoginRequestAPI,
    "/users/login",
    (values) => ({
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }),
    onSuccess
  );

  useEffect(() => cancelLoginRequestAPI, []);

  return Cookies.get("user") ? (
    <Redirect to="/" />
  ) : (
    <LoginPageWrapper>
      <LoginFormWrapper>
        <Typography.Title level={2}>Login to your account</Typography.Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validateLoginForm}
          onSubmit={handleSubmit}
        >
          <StyledForm>
            <FieldTitle>Email Address</FieldTitle>
            <BottomMarginFieldWrapper>
              <Field
                name="email"
                component={FormikCompatibleComponents.InputEmail}
                label="Email Address"
                type="email"
                autoComplete="on"
              />
              <FormErrorMessage name="email" />
            </BottomMarginFieldWrapper>

            <FieldTitle>Password</FieldTitle>
            <BottomMarginFieldWrapper>
              <Field
                type="password"
                name="password"
                component={FormikCompatibleComponents.InputPassword}
              />
              <FormErrorMessage name="password" />
            </BottomMarginFieldWrapper>
            <SubmitButton type="primary" size="large" htmlType="submit" block>
              Login
            </SubmitButton>
            <RegisterAccountWrapper>
              New to Q&A Forum?&nbsp;&nbsp;{" "}
              <Link to="/register">Create Acount</Link>
            </RegisterAccountWrapper>
          </StyledForm>
        </Formik>
      </LoginFormWrapper>
    </LoginPageWrapper>
  );
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
