import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  showNotification,
  clearGallery,
  showLoader,
  hideLoader,
  getCardHeight,
} from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = document.querySelector('#search-input');
// const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-load-more');

let query = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = input.value.trim();
  if (!query) {
    showNotification('Please enter a search query.', 'warning');
    return;
  }

  page = 1;
  clearGallery();
  showLoader();
  input.value = '';

  try {
    const data = await fetchImages(query, page, perPage);

    hideLoader();
    if (data.hits.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!',
        'error'
      );
      loadMoreBtn.classList.add('hidden'); // скриваємо кнопку якщо зображення відсутнє
      return;
    }
    renderImages(data.hits);

    if (data.hits.length === perPage) {
      loadMoreBtn.classList.remove('hidden'); // покузує кнопку якщо є наступна группа зображень
    } else {
      loadMoreBtn.classList.add('hidden'); //скриваємо кнопку якщо зображення менше за perPage
    }
  } catch (error) {
    hideLoader();
    showNotification('Error: ' + error.message);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    hideLoader();
    renderImages(data.hits);

    if (data.hits.length < perPage) {
      loadMoreBtn.classList.add('hidden'); // скриваємо кнопку якщо більше немає зображень
      showNotification(
        "We're sorry, but you've reached the of search results.",
        'info'
      );
    }
    //прокручування сторінки після завантаження нових зображень

    const cardHeight = getCardHeight();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoader();
    showNotification('Error:' + error.message);

    loadMoreBtn.classList.add('hidden'); // скриває кнопку при помилці
  }
});
