import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Popover, Pagination, Radio, Result } from 'antd';
import { FilterOutlined, SmileOutlined } from '@ant-design/icons';

import Question from 'components/Question';
import PaddedRowWrapper from 'components/PaddedRowWrapper';
import { createCancellableRequestAPI, fetchData } from 'utils/request';
import {
  PageHeaderWrapper,
  PageHeaderTitle,
  PageHeaderDescription,
  PaginationWrapper,
} from './styles';

const [
  cancellableQuestionsRequestAPI,
  cancelQuestionsRequestAPI,
] = createCancellableRequestAPI();

function Home() {
  const [visibility, setVisibility] = useState(false);
  const [data, setData] = useState({
    isFetching: true,
    error: false,
    dataSource: [],
    pagination: { current: 1, pageSize: 5 },
    filters: { programmingLanguage: [] },
    toIncludeCount: true,
  });
  const history = useHistory();

  const handleChangePage = (page) => {
    setData({
      ...data,
      isFetching: true,
      pagination: { current: page, pageSize: data.pagination.pageSize },
    });
  };

  const handleVisibleChange = () => {
    setVisibility(!visibility);
  };

  const handleAskQuestion = () => {
    history.push('/askquestion');
  };

  const handleFilter = ({ target: { value } }) => {
    if (value === 'All') {
      setData({
        ...data,
        isFetching: true,
        pagination: { ...data.pagination, current: 1 },
        filters: { programmingLanguage: [] },
      });
    } else {
      setData({
        ...data,
        isFetching: true,
        pagination: { ...data.pagination, current: 1 },
        filters: { programmingLanguage: [value] },
      });
    }
  };

  useEffect(() => {
    fetchData(
      data,
      cancellableQuestionsRequestAPI,
      `/questions/`,
      { credentials: 'include' },
      setData,
    );
    return () => {
      cancelQuestionsRequestAPI();
    };
  }, [data]);

  return (
    <PaddedRowWrapper>
      <PageHeaderWrapper>
        <PageHeaderTitle>
          <Typography.Title level={2}>All Questions</Typography.Title>
          <Button type="primary" onClick={handleAskQuestion}>
            Ask Question
          </Button>
        </PageHeaderTitle>
        <PageHeaderDescription>
          {data.pagination.total === 0 ? (
            <div>No question yet</div>
          ) : (
            <div>
              Showing {(data.pagination.current - 1) * 5 + 1}-
              {data.pagination.total < data.pagination.current * 5
                ? data.pagination.total
                : data.pagination.current * 5}{' '}
              of {data.pagination.total} questions
            </div>
          )}

          <Popover
            title="Filter By"
            trigger="click"
            placement="bottom"
            visible={visibility}
            onVisibleChange={handleVisibleChange}
            content={
              <Radio.Group
                defaultValue="All"
                buttonStyle="solid"
                onChange={handleFilter}
              >
                <Radio.Button value="All">All</Radio.Button>
                <Radio.Button value="Javascript">Javascript</Radio.Button>
                <Radio.Button value="Ruby">Ruby</Radio.Button>
                <Radio.Button value="Java">Java</Radio.Button>
                <Radio.Button value="MySQL">MySQL</Radio.Button>
                <Radio.Button value="Python">Python</Radio.Button>
              </Radio.Group>
            }
          >
            <Button icon={<FilterOutlined />} size={24}>
              Filter
            </Button>
          </Popover>
        </PageHeaderDescription>
      </PageHeaderWrapper>
      {data.pagination.total === 0 ? (
        <Result
          icon={<SmileOutlined />}
          title="Be the first to ask question!"
          extra={
            <Button type="primary" onClick={handleAskQuestion}>
              Ask Question
            </Button>
          }
        />
      ) : (
        <>
          {data.dataSource.map((data) => {
            return <Question key={data.questionId} type="question" {...data} />;
          })}
          <PaginationWrapper>
            <Pagination
              onChange={handleChangePage}
              total={data.pagination.total}
              defaultCurrent={1}
              current={data.pagination.current}
              defaultPageSize={data.pagination.pageSize}
            />
          </PaginationWrapper>
        </>
      )}
    </PaddedRowWrapper>
  );
}

export default Home;
