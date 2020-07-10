import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 4em;
`;

export const createLoadableComponent = (importFunc) => {
  const LazyComponent = lazy(importFunc);

  return (props) => (
    <Suspense
      fallback={
        <LoadingIconWrapper>
          <LoadingOutlined />
        </LoadingIconWrapper>
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );
};
