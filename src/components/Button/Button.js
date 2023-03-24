import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export const ButtonLoadMore = ({ onClick }) => {
  return (
    <Button onClick={onClick} type="button">
      Load more
    </Button>
  );
};

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
