import React, { useState } from 'react';
import { Typography, Button, Popover } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import Question from 'components/Question';
import VertGrowableRowWrapper from 'containers/VertGrowableRowWrapper';
import PaddedRowWrapper from 'containers/PaddedRowWrapper';
import {
  PageHeaderWrapper,
  PageHeaderTitle,
  PageHeaderDescription,
} from './styles';

function Home() {
  const [visibility, setVisibility] = useState(false);

  const handleVisibleChange = () => {
    setVisibility(!visibility);
  };

  return (
    <VertGrowableRowWrapper>
      <PaddedRowWrapper>
        <PageHeaderWrapper>
          <PageHeaderTitle>
            <Typography.Title level={2}>All Questions</Typography.Title>
            <Button type="primary">Ask Question</Button>
          </PageHeaderTitle>
          <PageHeaderDescription>
            <div>Showing 1-10 of 1000 questions</div>
            <Popover
              content={<div>Tags...</div>}
              title="Filter By"
              trigger="click"
              placement="bottom"
              visible={visibility}
              onVisibleChange={handleVisibleChange}
            >
              <Button icon={<FilterOutlined />} size={24}>
                Filter
              </Button>
            </Popover>
          </PageHeaderDescription>
        </PageHeaderWrapper>
        <Question />
        <Question />
        <Question />
      </PaddedRowWrapper>
    </VertGrowableRowWrapper>
  );
}

export default Home;
