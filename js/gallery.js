import galleryDataArr from './data/gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');

renderGalleryToEnd(galleryDataArr);

galleryListRef.addEventListener('click', onGalleryListClick);

function generateGalleryMarkup(galleryDataArr) {
  return galleryDataArr.reduce(
    (markupAcc, { preview, original, description }) =>
      markupAcc +
      `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
        </a>
      </li>`,
    '',
  );
}

function renderGalleryToEnd(galleryDataArr) {
  galleryListRef.insertAdjacentHTML(
    'beforeend',
    generateGalleryMarkup(galleryDataArr),
  );
}

function onGalleryListClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) return;

  console.log(e.target.dataset.source);
}
