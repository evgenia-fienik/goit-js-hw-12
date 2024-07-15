import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44774351-929c2aa0766411c652402d8c1';

//отримання зображень з API pixabay
export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  if (!response.status === 200) {
    throw new Error(response.status);
  }
  return response.data;
}
