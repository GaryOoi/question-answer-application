import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, Input } from "antd";
import { Formik, Field, message } from "formik";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import {
  createFormikCompatibleComponent,
  createSubmitHandler,
} from "utils/formik";
import { createCancellableRequestAPI } from "utils/request";
import { validateRegisterForm } from "utils/validation";
import FormErrorMessage from "components/FormErrorMessage";
import {
  RegisterPageWrapper,
  RegisterFormWrapper,
  StyledForm,
  FieldTitle,
  BottomMarginFieldWrapper,
  SubmitButton,
  RegisterAccountWrapper,
} from "./styles";

const FormikCompatibleComponents = {
  NormalInput: createFormikCompatibleComponent(Input, false),
  InputPassword: createFormikCompatibleComponent(Input.Password, false),
};

const [
  cancellableRegisterRequestAPI,
  cancelRegisterRequestAPI,
] = createCancellableRequestAPI();

function Register() {
  const history = useHistory();

  const onSuccess = () => {
    message.success("Register successfully!");
    history.push("/login");
  };

  const handleSubmit = createSubmitHandler(
    cancellableRegisterRequestAPI,
    "/users/register",
    (values) => ({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }),
    onSuccess
  );

  useEffect(() => cancelRegisterRequestAPI, []);

  return Cookies.get("user") ? (
    <Redirect to="/" />
  ) : (
    <RegisterPageWrapper>
      <RegisterFormWrapper>
        <Typography.Title level={2}>Create your account</Typography.Title>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validate={validateRegisterForm}
          onSubmit={handleSubmit}
        >
          {(isSubmitting) => (
            <StyledForm>
              <FieldTitle>Username</FieldTitle>
              <BottomMarginFieldWrapper>
                <Field
                  name="username"
                  component={FormikCompatibleComponents.NormalInput}
                  label="Email Address"
                  type="text"
                  autoComplete="on"
                />
                <FormErrorMessage name="username" />
              </BottomMarginFieldWrapper>
              <FieldTitle>Email Address</FieldTitle>
              <BottomMarginFieldWrapper>
                <Field
                  name="email"
                  component={FormikCompatibleComponents.NormalInput}
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
                Create Account
              </SubmitButton>
              <RegisterAccountWrapper>
                Already have an account?&nbsp;&nbsp;
                <Link to="/login">Login account</Link>
              </RegisterAccountWrapper>
            </StyledForm>
          )}
        </Formik>
      </RegisterFormWrapper>
    </RegisterPageWrapper>
  );
}

Register.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Register;
