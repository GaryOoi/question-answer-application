import styled from 'styled-components';
import { Layout } from 'antd';

export const FlexGrowDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FlexLayoutContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
`;
