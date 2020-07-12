import styled from 'styled-components';
import { Layout } from 'antd';

export const LayoutHeader = styled(Layout.Header)`
  display: flex;
  align-items: center;
  padding: 0 200px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export const FlexGrowPlaceholder = styled.div`
  flex-grow: 1;
`;

export const HeaderClickableWrapper = styled.div`
  position: relative;
  padding: 0.25em 0.5em;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-weight: bold;
  color: white;

  &:hover {
    color: #90caf9;
  }
`;
