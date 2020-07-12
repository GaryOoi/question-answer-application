import React from 'react';
import PropTypes from 'prop-types';

import { BackgroundColorWrapper, PaddedWrapper } from './styles';

function PaddedRowWrapper({ children }) {
  return (
    <BackgroundColorWrapper>
      <PaddedWrapper>{children}</PaddedWrapper>
    </BackgroundColorWrapper>
  );
}

PaddedRowWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaddedRowWrapper;
