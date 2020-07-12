import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Typography, Input, Select, Row, Col, Button, message } from 'antd';

import FormErrorMessage from 'components/FormErrorMessage';
import PaddedRowWrapper from 'components/PaddedRowWrapper';
import {
  createFormikCompatibleComponent,
  createSubmitHandler,
} from 'utils/formik';
import { createProtectedComponent } from 'utils/auth';
import { validateAskQuestionForm } from 'utils/validation';
import { createCancellableRequestAPI } from 'utils/request';
import {
  AskQuestionFormWrapper,
  FieldTitle,
  BottomMarginFieldWrapper,
} from './styles';

const FormikCompatibleComponents = {
  Input: createFormikCompatibleComponent(Input, false),
  TextArea: createFormikCompatibleComponent(Input.TextArea, false),
  Select: createFormikCompatibleComponent(Select, true),
};

const PROGRAMMING_LANGUAGES = [
  {
    name: 'Choose programming language...',
    value: '',
  },
  {
    name: 'Javascript',
    value: 'Javascript',
  },
  {
    name: 'Ruby',
    value: 'Ruby',
  },
  {
    name: 'Java',
    value: 'Java',
  },
  {
    name: 'MySQL',
    value: 'MySQL',
  },
  {
    name: 'Python',
    value: 'Python',
  },
];

const [
  cancellableAskQuestionRequestAPI,
  cancelAskQuestionRequestAPI,
] = createCancellableRequestAPI();

function AskQuestion(props) {
  const history = useHistory();

  const onSuccess = () => {
    message.success('Question has been posted successfully!');
    history.push('/');
  };

  const handleCancel = () => {
    history.push('/');
  };

  const handleSubmit = createSubmitHandler(
    cancellableAskQuestionRequestAPI,
    '/questions/',
    (values) => ({
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }),
    onSuccess,
  );

  useEffect(() => cancelAskQuestionRequestAPI, []);

  return (
    <PaddedRowWrapper>
      <AskQuestionFormWrapper>
        <Typography.Title level={2}>Ask Question</Typography.Title>
        <Formik
          initialValues={{ title: '', content: '', programmingLanguage: '' }}
          validate={validateAskQuestionForm}
          onSubmit={handleSubmit}
        >
          <Form>
            <FieldTitle>Title</FieldTitle>
            <BottomMarginFieldWrapper>
              <Field
                name="title"
                component={FormikCompatibleComponents.Input}
                label="Title"
                type="text"
                placeholder="Write your quesion here."
              />
              <FormErrorMessage name="title" />
            </BottomMarginFieldWrapper>

            <FieldTitle>Content</FieldTitle>
            <BottomMarginFieldWrapper>
              <Field
                name="content"
                component={FormikCompatibleComponents.TextArea}
                label="Content"
                type="text"
                rows={6}
                size="large"
                placeholder="Explain in details..."
              />
              <FormErrorMessage name="content" />
            </BottomMarginFieldWrapper>

            <Row gutter={16}>
              <Col span={8}>
                <BottomMarginFieldWrapper>
                  <Field
                    name="programmingLanguage"
                    component={FormikCompatibleComponents.Select}
                    placeholder="Choose programming language..."
                  >
                    {PROGRAMMING_LANGUAGES.map((programmingLanguage) => (
                      <Select.Option
                        key={programmingLanguage.name}
                        value={programmingLanguage.value}
                      >
                        {programmingLanguage.name}
                      </Select.Option>
                    ))}
                  </Field>
                  <FormErrorMessage name="programmingLanguage" />
                </BottomMarginFieldWrapper>
              </Col>
              <Col span={3} offset={10}>
                <Button size="large" onClick={handleCancel} block>
                  Cancel
                </Button>
              </Col>
              <Col span={3}>
                <Button type="primary" htmlType="submit" size="large" block>
                  Post
                </Button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </AskQuestionFormWrapper>
    </PaddedRowWrapper>
  );
}

AskQuestion.propTypes = {};

export default createProtectedComponent(AskQuestion);
