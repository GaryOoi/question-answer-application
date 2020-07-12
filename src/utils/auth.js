import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import Cookies from 'js-cookie';

export function createProtectedComponent(CustomComponent) {
  function ProtectedComponent(props) {
    const isAuthorized = Cookies.get('user');

    useEffect(() => {
      if (!isAuthorized) {
        message.error('Please login to ask question!');
      }
    }, [isAuthorized]);

    if (isAuthorized) {
      return <CustomComponent {...props} />;
    }

    return <Redirect to="/login" />;
  }
  return ProtectedComponent;
}
