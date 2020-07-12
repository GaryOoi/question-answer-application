import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import moment from 'moment';

import {
  QuestionWrapper,
  QuestionType,
  QuestionContent,
  QuestionDescription,
  QuestionActionBar,
  QuestionActionButton,
  StyledCommentOutlined,
} from './styles';

function Question({
  type,
  questionId,
  title,
  content,
  answers,
  programmingLanguage,
  askedBy,
  createdAt,
}) {
  const history = useHistory();
  const handleClick = () => {
    history.push('/answer');
  };
  let formattedCreatedAt = moment(createdAt).format('MMMM DD, YYYY');

  return (
    <QuestionWrapper>
      <QuestionType>{programmingLanguage}</QuestionType>
      {type === 'question' ? (
        <Typography.Title level={4}>
          <Link
            to={{
              pathname: `/answer/${questionId}`,
              state: {
                question: {
                  questionId,
                  title,
                  content,
                  answers,
                  programmingLanguage,
                  askedBy,
                  createdAt,
                },
              },
            }}
          >
            {title}
          </Link>
        </Typography.Title>
      ) : (
        <Typography.Title level={4}>{title}</Typography.Title>
      )}
      <QuestionContent>{content}</QuestionContent>
      <QuestionDescription>
        Asked by {askedBy} on {formattedCreatedAt}
      </QuestionDescription>
      <QuestionActionBar>
        <QuestionActionButton
          type="text"
          icon={<StyledCommentOutlined />}
          onClick={handleClick}
          disabled={type !== 'question'}
        >
          {answers} Answers
        </QuestionActionButton>
      </QuestionActionBar>
    </QuestionWrapper>
  );
}

Question.propTypes = {
  type: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  answers: PropTypes.number.isRequired,
  programmingLanguage: PropTypes.string.isRequired,
  askedBy: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Question;
