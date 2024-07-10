import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => createImageCard(image)).join('');
  gallery.innerHTML = markup; //очищуємо попередній результат

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

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
export function showNotification(message, type = 'info') {
  iziToast[type]({
    title: '',
    message: message,
    position: 'topRight',
  });
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
