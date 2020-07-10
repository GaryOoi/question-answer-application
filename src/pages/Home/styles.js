import styled from 'styled-components';

export const PageHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1.5px #f4f5f6;
  margin-bottom: 20px;
`;

export const PageHeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const PageHeaderDescription = styled(PageHeaderTitle)`
  margin-bottom: 20px;
`;
