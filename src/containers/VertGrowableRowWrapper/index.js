import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

function VertGrowableRowWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

VertGrowableRowWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VertGrowableRowWrapper;
