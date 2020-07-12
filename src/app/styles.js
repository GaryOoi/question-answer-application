import styled from 'styled-components';
import { Layout } from 'antd';

export const FlexGrowDiv = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

export const FlexLayoutContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
`;
