import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Button, Typography, Input, message, Pagination, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

import FormErrorMessage from 'components/FormErrorMessage';
import Question from 'components/Question';
import UserAnswer from 'components/UserAnswer';
import PaddedRowWrapper from 'components/PaddedRowWrapper';
import {
  createFormikCompatibleComponent,
  createSubmitHandler,
} from 'utils/formik';
import { validateAnswerForm } from 'utils/validation';
import { createCancellableRequestAPI, fetchData } from 'utils/request';
import {
  AnswerListWrapper,
  StyledForm,
  BottomMarginFieldWrapper,
  AnswerTitleWrapper,
  PaginationWrapper,
} from './styles';

const FormikCompatibleComponents = {
  TextArea: createFormikCompatibleComponent(Input.TextArea, false),
};

const [
  cancellableAnswerQuestionRequestAPI,
  cancelAnswerQuestionRequestAPI,
] = createCancellableRequestAPI();

const [
  cancellableQuestionRequestAPI,
  cancelQuestionRequestAPI,
] = createCancellableRequestAPI();

function Answer({ location }) {
  const userJsonStr = Cookies.get('user');
  const user = userJsonStr ? JSON.parse(userJsonStr) : false;
  const history = useHistory();
  const [data, setData] = useState({
    isFetching: true,
    error: false,
    dataSource: [],
    pagination: { current: 1, pageSize: 10 },
    filters: { questionId: [location.state.question.questionId] },
    toIncludeCount: true,
  });

  const onSuccess = () => {
    message.success('Answer has been posted successfully!');
    setData({
      ...data,
      isFetching: true,
    });
  };

  const handleChangePage = (page) => {
    setData({
      ...data,
      isFetching: true,
      pagination: { current: page, pageSize: data.pagination.pageSize },
    });
  };

  const handleEditableFormSubmit = (values, actions) => {
    const { resetForm } = actions;

    const handleSubmit = createSubmitHandler(
      cancellableAnswerQuestionRequestAPI,
      '/answers/',
      (values) => ({
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          questionId: location.state.question.questionId,
        }),
      }),
      () => {
        resetForm();
        onSuccess();
      },
    );

    if (user) {
      handleSubmit(values, actions);
    } else {
      message.error('Please login to contribute answer!');
      history.push('/login');
    }
  };

  useEffect(() => {
    fetchData(
      data,
      cancellableQuestionRequestAPI,
      `/answers/`,
      { credentials: 'include' },
      setData,
    );

    return () => {
      cancelAnswerQuestionRequestAPI();
      cancelQuestionRequestAPI();
    };
  }, [data]);

  return (
    <PaddedRowWrapper>
      <AnswerListWrapper>
        <Question
          {...location.state.question}
          type="answer"
          answers={data.pagination.total}
        />
        <Formik
          initialValues={{ content: '' }}
          validate={validateAnswerForm}
          onSubmit={handleEditableFormSubmit}
        >
          <StyledForm>
            <BottomMarginFieldWrapper>
              <Field
                name="content"
                component={FormikCompatibleComponents.TextArea}
                label="Content"
                type="text"
                rows={6}
                size="large"
                placeholder="What's your thought?"
              />
              <FormErrorMessage name="content" />
            </BottomMarginFieldWrapper>

            <Button htmlType="submit" type="primary">
              Post Your Answer
            </Button>
          </StyledForm>
        </Formik>

        <AnswerTitleWrapper>
          <Typography.Title level={4}>
            {data.pagination.total} Answers
          </Typography.Title>
        </AnswerTitleWrapper>
        {data.pagination.total === 0 ? (
          <Result
            icon={<SmileOutlined />}
            title="Be the first to contribute answer!"
          />
        ) : (
          <>
            {data.dataSource.map((answer) => {
              return <UserAnswer key={answer.id} {...answer} />;
            })}
            <PaginationWrapper>
              <Pagination
                onChange={handleChangePage}
                total={data.pagination.total}
                defaultCurrent={1}
                current={data.pagination.current}
                defaultPageSize={data.pagination.pageSize}
              />
            </PaginationWrapper>
          </>
        )}
      </AnswerListWrapper>
    </PaddedRowWrapper>
  );
}

Answer.propTypes = {};

export default Answer;
