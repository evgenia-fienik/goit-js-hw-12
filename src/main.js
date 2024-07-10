import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  showNotification,
  clearGallery,
} from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = document.querySelector('#search-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) {
    showNotification('Please enter a search query.', 'warning');
    return;
  }
  clearGallery();
  showLoader();
  input.value = '';

  fetchImages(query)
    .then(data => {
      hideLoader();
      if (data.hits.length === 0) {
        showNotification(
          'Sorry, there are no images matching your search query. Please try again!',
          'error'
        );
        return;
      }
      renderImages(data.hits);
    })
    .catch(error => {
      hideLoader();
      showNotification('Error: ' + error.message);
    });
});

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}
