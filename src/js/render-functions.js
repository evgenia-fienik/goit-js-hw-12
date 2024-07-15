import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;
// відображає галерею зображень на основі масиву зображень
export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => createImageCard(image)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

//приймає об'єкт зображення як параметр та повертає HTML-код для картки зображення
function createImageCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <div class="photo-card">
  <a href="${largeImageURL}">
    <img cass="img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
      <div class="info">
        <p class="info-item"><b>Likes </b>${likes}</p>
        <p  class="info-item"><b>Views </b>${views}</p>
        <p class="info-item"><b>Comments </b>${comments}</p>
        <p class="info-item"><b>Downloads </b>${downloads}</p>
      </div>
</div>`;
}

//відображає повідомлення у вигляді сповіщення
export function showNotification(message, type = 'info') {
  iziToast[type]({
    title: '',
    message: message,
    position: 'topRight',
  });
}

// очищує галерею зображень
export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

//відображає індикатор завантаження
export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
}

//ховає індикатор завантаження
export function hideLoader() {
  document.querySelector('.loader').classList.add('hidden');
}

//обчислення висоти картки галереї
export function getCardHeight() {
  const gallery = document.querySelector('.gallery');
  const firstCard = gallery.querySelector('.photo-card');
  return firstCard ? firstCard.getBoundingClientRect().height : 0;
}
