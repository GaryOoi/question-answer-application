import { message } from 'antd';

import { sleep } from './utils';
// import {
//   API_BASE_URL,
//   MAX_RECONNECTION_TRIES,
//   RECONNECTION_INTERVAL,
// } from '../globals/constants';
const API_BASE_URL = `http://localhost:${process.env.PORT || 8080}/api/v1`;
// const API_BASE_URL = 'http://localhost:8080/api/v1';
export const RECONNECTION_INTERVAL = 2000; // seconds
const MAX_RECONNECTION_TRIES = 3;

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}

/**
 * Send request to the API endpoint, returning a promise
 *
 * @param {string} apiUrl  The partial URL (will be prefixed with API_BASE_URL)
 * @param {object} options The options to pass to fetch()
 *
 * @returns {object}       Promise (as returned by fetch())
 */
export const requestAPI = (apiUrl, options) =>
  fetch(`${API_BASE_URL}${apiUrl}`, options).then(checkStatus).then(parseJSON);

/**
 * Create a cancellable version of requestAPI() and the corresponding cancel()
 *  function to cancel the request. Calling cancellableRequestAPI() will cancel
 *  all existing fetch requests made by cancellableRequestAPI().
 *
 * @returns {*} [(apiUrl, options) => Promise, () => void]
 */
export const createCancellableRequestAPI = () => {
  let currentAbortController = new AbortController();
  return [
    (apiUrl, options) => {
      currentAbortController.abort(); // Abort reentrant fetch
      currentAbortController = new AbortController();
      return requestAPI(apiUrl, {
        ...options,
        signal: currentAbortController.signal,
      });
    },
    () => currentAbortController.abort(),
  ];
};

/**
 * Asynchronously fetch data for a table with parameters for pagination, search,
 *  sort, filters and toIncludeCount. Include status checking, setting data,
 *  error handling, abort and auto-retry.
 *
 * @param {object} data                Data state (must have isFetching, error, dataSource, pagination, search, sorter, filters and toIncludeCount)
 * @param {func} cancellableRequestAPI Cancellable requestAPI() generated by createCancellableRequestAPI()
 * @param {string} apiUrl              Partial URL of API endpoint (GET)
 * @param {object} fetchOptions        The options to pass to fetch()
 * @param {func} setData               Data state setter function
 */
export const fetchData = async (
  data,
  cancellableRequestAPI,
  apiUrl,
  fetchOptions,
  setData,
) => {
  if (data.isFetching) {
    for (let i = MAX_RECONNECTION_TRIES; i >= 0; i -= 1) {
      try {
        const page = data.pagination.current;
        const filtersParam = Object.keys(data.filters)
          .map((filterField) =>
            data.filters[filterField]
              .map((filterValue) => `&${filterField}=${filterValue}`)
              .join(''),
          )
          .join('');

        const countParam = data.toIncludeCount ? '' : '&x=1';

        // eslint-disable-next-line no-await-in-loop
        const resObj = await cancellableRequestAPI(
          `${apiUrl}?p=${page}${filtersParam}${countParam}`,
          fetchOptions,
        );
        setData({
          ...data,
          isFetching: false,
          error: false,
          dataSource: resObj.v.map((record, index) => ({
            number: index + 1,
            ...record,
          })),
          pagination:
            resObj.c !== undefined
              ? { ...data.pagination, total: resObj.c }
              : data.pagination,
        });
        break;
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        if (err.response) {
          // eslint-disable-next-line no-loop-func
          err.response.text().then((errMsg) => {
            message.error(
              errMsg ||
                'Sorry, please check your internet connection and try again',
            );
          });
          setData({
            ...data,
            isFetching: false,
            error: true,
          });
          break;
        } else if (i > 0) {
          // eslint-disable-next-line no-await-in-loop
          await sleep(RECONNECTION_INTERVAL);
        } else {
          message.error(
            'Sorry, please check your internet connection and try again',
            5,
          );
          setData({
            ...data,
            isFetching: false,
            error: true,
          });
        }
      }
    }
  }
};
