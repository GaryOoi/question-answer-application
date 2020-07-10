import styled from 'styled-components';
import { Menu, Layout } from 'antd';

export const LayoutHeader = styled(Layout.Header)`
  padding: 0 200px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 20px;
  font-weight: bold;
  float: left;
`;

export const StyledMenu = styled(Menu)`
  float: right;
`;
