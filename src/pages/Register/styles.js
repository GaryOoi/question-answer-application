import styled from 'styled-components';
import { Button } from 'antd';
import { Form } from 'formik';

export const RegisterPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  background-color: white;
  padding: 50px 0;
`;

export const RegisterFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 460px;
  max-width: 460px;
`;

export const StyledForm = styled(Form)`
  width: 100%;
`;

export const FieldTitle = styled.h3`
  color: #757575;
  font-weight: bold;
  margin-bottom: 0.25em;
`;

export const BottomMarginFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const RegisterAccountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
