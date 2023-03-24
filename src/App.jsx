import { Component } from 'react';
import { getImages } from './components/service/getImages';

import { Container } from './components/Styles/Styles';
import { Searchbar } from './components/Searchbar/Searchbar';
import { Loader } from './components/Loader/Loader';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { ButtonLoadMore } from './components/Button/Button';
import { ImageModal } from './components/Modal/Modal';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

export class App extends Component {
  state = {
    textSearch: '',
    images: [],
    totalHits: 0,
    error: '',
    page: 1,
    isLoading: false,
    showModal: false,
    urlLarge: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.textSearch !== this.state.textSearch ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      try {
        getImages(this.state.textSearch, this.state.page).then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            totalHits: data.totalHits,
          }));
          if (data.total === 0) {
            this.setState({
              error:
                'Sorry, there are no images matching your search query. Please try again.',
            });
          }
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = textSearch => {
    if (textSearch === this.state.textSearch && this.state.page === 1) {
      alert('Images already showed');
      return;
    }
    this.setState({ textSearch, error: '', page: 1, totalHits: 0, images: [] });
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, urlLarge: '' });
  };

  onOpenModal = url => {
    this.setState({ showModal: true, urlLarge: url });
  };

  render() {
    return (
      <Container>
        <Searchbar onSearch={this.handleSubmit} />

        {this.state.isLoading && <Loader />}

        <ImageGallery data={this.state.images} onOpenModal={this.onOpenModal} />

        {this.state.page * 12 <= this.state.totalHits && (
          <ButtonLoadMore onClick={this.loadMore} />
        )}

        {Boolean(this.state.error.length) && (
          <ErrorMessage message={this.state.error} />
        )}

        {this.state.showModal && (
          <ImageModal
            onCloseModal={this.onCloseModal}
            url={this.state.urlLarge}
          />
        )}
      </Container>
    );
  }
}
