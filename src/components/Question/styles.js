import styled from 'styled-components';
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

export const QuestionContent = styled.div`
  display: -webkit-box;
  color: #212121;
  font-size: 16px;
  margin-bottom: 8px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  color: #616161;
  font-size: 13px;
  font-weight: bold;
`;

export const StyledCommentOutlined = styled(CommentOutlined)`
  font-size: 16px;
`;
