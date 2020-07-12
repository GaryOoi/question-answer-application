import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import { resolveServerValidationErrorMessages } from './utils';

export const createFormikCompatibleComponent = (
  CustomComponent,
  isValueReceivedDirectly,
) => {
  function FormikCompatibleComponent({ field, form, ...props }) {
    const { value, onChange, ...fieldProps } = field;
    const { setFieldTouched } = form;
    const handleChange = isValueReceivedDirectly
      ? (eventValue) => {
          setFieldTouched(field.name, true, false);
          const syntheticEvent = {
            target: { value: eventValue, name: field.name },
            type: 'custom',
          };
          onChange(syntheticEvent);
        }
      : (e) => {
          setFieldTouched(field.name, true, false);
          onChange(e);
        };

    return typeof value === 'boolean' ? (
      <CustomComponent
        checked={value}
        onChange={handleChange}
        {...fieldProps}
        {...props}
      />
    ) : (
      <CustomComponent
        value={value}
        onChange={handleChange}
        {...fieldProps}
        {...props}
      />
    );
  }
  FormikCompatibleComponent.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };
  return FormikCompatibleComponent;
};

export const createSubmitHandler = (
  cancellableRequestAPI,
  apiUrl,
  createFetchOptions,
  onSuccess,
) => (values, { setErrors, setSubmitting }) => {
  cancellableRequestAPI(apiUrl, createFetchOptions(values))
    .then((resObj) => {
      setSubmitting(false);
      if (resObj.type === 'invalid') {
        setErrors(resolveServerValidationErrorMessages(resObj.error));
      } else {
        onSuccess(values, resObj);
      }
    })
    .catch((err) => {
      if (err.name === 'AbortError') {
        return;
      }
      setSubmitting(false);
      if (err.response) {
        err.response.text().then((errMsg) => {
          message.error(
            errMsg ||
              'Sorry, please check your internet connection and try again',
          );
        });
      } else {
        message.error(
          'Sorry, please check your internet connection and try again',
        );
      }
    });
};
