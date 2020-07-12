// External URLs (from client)
const API_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8000'
    : 'http://localhost:8000';
const REACT_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://question-answering-system.herokuapp.com'
    : 'http://localhost:3000';

// Internal URL (from server)
const NAS_BASE_URL = 'http://localhost:8001/api/v1';

const JWT_EXPIRY_DURATION = '1d';
const SECONDS_TO_REFRESH_JWT = 12 * 60 * 60;

const PAGINATION_PAGE_SIZE = 10;

module.exports = {
  API_DOMAIN,
  REACT_DOMAIN,
  NAS_BASE_URL,
  JWT_EXPIRY_DURATION,
  SECONDS_TO_REFRESH_JWT,
  PAGINATION_PAGE_SIZE,
};
