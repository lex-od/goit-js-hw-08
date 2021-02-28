import galleryDataArr from './data/gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');

renderGalleryDataAtEnd(galleryDataArr);

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

function renderGalleryDataAtEnd(galleryDataArr) {
  galleryListRef.insertAdjacentHTML(
    'beforeend',
    generateGalleryMarkup(galleryDataArr),
  );
}
