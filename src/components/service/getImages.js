import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32999869-250accc55f8619ccb56097a0b';

export async function getImages(inputValue, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${inputValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}
