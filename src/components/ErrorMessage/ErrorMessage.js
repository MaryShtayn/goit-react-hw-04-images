import { Wrapper } from './ErrorMessage.styled';
import PropTypes from 'prop-types';

export const ErrorMessage = ({ message }) => {
  return (
    <Wrapper>
      <p>{message}</p>
      <img
        src="https://img.freepik.com/premium-vector/404-error-web-page-template-with-cute-cat_540634-1.jpg?w=2000"
        alt="Error 404"
        width="450px"
      />
    </Wrapper>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
