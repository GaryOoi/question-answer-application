import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  UserAnswerWrapper,
  UserAnswerDescription,
  UserAnswerContent,
} from './styles';

function UserAnswer({ content, createdAt, answeredBy }) {
  let formattedCreatedAt = moment(createdAt).format('MMMM DD, YYYY');
  return (
    <UserAnswerWrapper>
      <UserAnswerDescription>
        {answeredBy}, {formattedCreatedAt}
      </UserAnswerDescription>
      <UserAnswerContent>
        <p>{content}</p>
      </UserAnswerContent>
    </UserAnswerWrapper>
  );
}

UserAnswer.propTypes = {
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  answeredBy: PropTypes.string.isRequired,
};

export default UserAnswer;
