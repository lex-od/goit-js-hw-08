import galleryDataArr from './data/gallery-items.js';

// ==================== 📌 MAIN PART ====================

const galleryListRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxCloseBtnRef = lightboxRef.querySelector(
  '[data-action="close-lightbox"]',
);
const lightboxImgRef = lightboxRef.querySelector('img');

renderGalleryToEnd(galleryDataArr);

galleryListRef.addEventListener('click', onGalleryListClick);
lightboxCloseBtnRef.addEventListener('click', closeLightbox);

// ==================== 📌 GALLERY FUNCTIONS ====================

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

  openLightbox(e.target.dataset.source, e.target.alt);
}

// ==================== 📌 LIGHTBOX FUNCTIONS ====================

function openLightbox(imgSrc, imgAlt) {
  lightboxImgRef.src = imgSrc;
  lightboxImgRef.alt = imgAlt;

  lightboxRef.classList.add('is-open');
}

function closeLightbox() {
  lightboxRef.classList.remove('is-open');

  lightboxImgRef.src = '';
  lightboxImgRef.alt = '';
}
