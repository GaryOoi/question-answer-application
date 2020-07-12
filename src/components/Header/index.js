import React, { useCallback } from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { requestAPI } from 'utils/request';
import {
  LayoutHeader,
  HeaderTitle,
  FlexGrowPlaceholder,
  HeaderClickableWrapper,
} from './styles';

function Header({ location }) {
  const history = useHistory();
  const userJsonStr = Cookies.get('user');
  const user = userJsonStr ? JSON.parse(userJsonStr) : false;
  const pathSnippets = location.pathname.split('/').slice(1);

  const handleLogout = useCallback(() => {
    requestAPI('/users/logout', { credentials: 'include' })
      .then((resObj) => {
        if (resObj.type === 'msg') {
          message.error(resObj.msg);
        } else {
          message.success('You have been successfully logged out');
        }
        history.push('/');
      })
      .catch((err) => {
        if (err.response) {
          err.response.text().then((errMsg) => {
            message.error(
              errMsg ||
                'Sorry, please check your internet connection and try again',
            );
          });
        } else {
          message.error(
            'Sorry, please check your internet connection and try again',
          );
        }
      });
  }, [history]);

  if (user) {
    return (
      <LayoutHeader>
        <Link to="/">
          <HeaderTitle>Q&A Forum</HeaderTitle>
        </Link>
        <FlexGrowPlaceholder />
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item onClick={handleLogout}>Log Out</Menu.Item>
            </Menu>
          }
        >
          <HeaderClickableWrapper>
            Hi, {user.username} <DownOutlined />
          </HeaderClickableWrapper>
        </Dropdown>
      </LayoutHeader>
    );
  }
  return (
    <LayoutHeader>
      <Link to="/">
        <HeaderTitle>Q&A Forum</HeaderTitle>
      </Link>
      <FlexGrowPlaceholder />
      <Menu theme="dark" mode="horizontal" selectedKeys={pathSnippets}>
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Create Account</Link>
        </Menu.Item>
      </Menu>
    </LayoutHeader>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Header);
