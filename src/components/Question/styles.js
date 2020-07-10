import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 20px;
`;

export const QuestionType = styled.div`
  color: #939598;
  font-size: 13px;
  line-height: 1.5;
`;

export const QuestionTitleLink = styled(Link)`
  &:hover,
  :active {
    color: #212121;
    text-decoration: underline;
  }
`;

export const QuestionDescription = styled(QuestionType)`
  margin-bottom: 24px;
`;

export const QuestionActionBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const QuestionActionButton = styled(Button)`
  color: #757575;
  font-size: 13px;
  font-weight: bold;
`;

export const StyledCommentOutlined = styled(CommentOutlined)`
  font-size: 16px;
`;
