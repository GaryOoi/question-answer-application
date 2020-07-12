import styled from 'styled-components';
import { Input } from 'antd';
import { Form } from 'formik';

export const AnswerListWrapper = styled.div`
  width: 80%;
`;

export const StyledForm = styled(Form)`
  margin-bottom: 20px;
`;

export const BottomMarginFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const TextArea = styled(Input.TextArea)`
  margin-bottom: 20px;
`;

export const AnswerTitleWrapper = styled.div`
  margin-bottom: 36px;
  border-bottom: solid 1.5px #f4f5f6;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
