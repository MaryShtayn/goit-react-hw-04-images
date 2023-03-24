import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, tags, largeUrl, onClick }) => {
  return (
    <Item onClick={() => onClick(largeUrl)}>
      <Image src={url} alt={tags} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
