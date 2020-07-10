import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import { LayoutHeader, HeaderTitle, StyledMenu } from './styles';

function Header(props) {
  return (
    <LayoutHeader>
      <HeaderTitle>Q&A Forum</HeaderTitle>
      <StyledMenu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="2">Register</Menu.Item>
      </StyledMenu>
    </LayoutHeader>
  );
}

Header.propTypes = {};

export default withRouter(Header);
