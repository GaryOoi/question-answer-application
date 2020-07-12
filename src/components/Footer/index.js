import React from 'react';
import { Layout } from 'antd';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Layout.Footer
      style={{
        textAlign: 'center',
        backgroundColor: '#001529',
        color: 'white',
      }}
    >
      Copyright &copy;
      {year}
    </Layout.Footer>
  );
}

export default Footer;
