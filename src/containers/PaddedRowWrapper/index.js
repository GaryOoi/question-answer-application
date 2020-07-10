import React from 'react';
import PropTypes from 'prop-types';

import { BackgroundColorWrapper, PaddedWrapper } from './styles';

function PaddedRowWrapper({ backgroundColor, children }) {
  return (
    <BackgroundColorWrapper>
      <PaddedWrapper>{children}</PaddedWrapper>
    </BackgroundColorWrapper>
  );
}

PaddedRowWrapper.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PaddedRowWrapper;
