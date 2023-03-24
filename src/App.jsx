import { useState, useEffect } from 'react';
import { getImages } from './components/service/getImages';

import { Container } from './components/Styles/Styles';
import { Searchbar } from './components/Searchbar/Searchbar';
import { Loader } from './components/Loader/Loader';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { ButtonLoadMore } from './components/Button/Button';
import { ImageModal } from './components/Modal/Modal';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [urlLarge, setUrlLarge] = useState('');
  useEffect(() => {
    if (!textSearch) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await getImages(textSearch, page);
        setImages(images => [...images, ...data.hits]);
        setTotalHits(data.totalHits);

        if (data.total === 0) {
          setError(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [textSearch, page]);

  const handleSubmit = textSearchValue => {
    if (textSearchValue === textSearch && page === 1) {
      alert('Images already showed');
      return;
    }
    setTextSearch(textSearchValue);
    setError('');
    setPage(1);
    setTotalHits(0);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setUrlLarge('');
  };

  const onOpenModal = url => {
    setShowModal(true);
    setUrlLarge(url);
  };

  return (
    <Container>
      <Searchbar onSearch={handleSubmit} />

      {isLoading && <Loader />}

      <ImageGallery data={images} onOpenModal={onOpenModal} />

      {page * 12 <= totalHits && <ButtonLoadMore onClick={loadMore} />}

      {Boolean(error.length) && <ErrorMessage message={error} />}

      {showModal && <ImageModal onCloseModal={onCloseModal} url={urlLarge} />}
    </Container>
  );
};
