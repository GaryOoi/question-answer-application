import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

import {
  QuestionWrapper,
  QuestionType,
  QuestionTitleLink,
  QuestionDescription,
  QuestionActionBar,
  QuestionActionButton,
  StyledCommentOutlined,
} from './styles';

function Question(props) {
  return (
    <QuestionWrapper>
      <QuestionType>Javascript</QuestionType>
      <QuestionTitleLink to="/">
        <Typography.Title level={4}>
          Are the variables inside the parentheses preceding callback functions
          in Flutter passed as arguments into those callback functions?
        </Typography.Title>
      </QuestionTitleLink>
      <QuestionDescription>
        Asked by lala64 on December 18, 2019
      </QuestionDescription>
      <QuestionActionBar>
        <QuestionActionButton type="text" icon={<StyledCommentOutlined />}>
          24 Answers
        </QuestionActionButton>
      </QuestionActionBar>
    </QuestionWrapper>
  );
}

Question.propTypes = {};

export default Question;
