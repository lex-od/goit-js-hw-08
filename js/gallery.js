import galleryDataArr from './data/gallery-items.js';

// ==================== 📌 MAIN PART ====================

const galleryListRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxCloseBtnRef = lightboxRef.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxImgRef = lightboxRef.querySelector('img');
const lightboxOverlayRef = lightboxRef.querySelector(
  'div[data-action="close-lightbox"]',
);

renderGalleryToEnd(galleryDataArr);

let currentGalleryImgRef = null;

galleryListRef.addEventListener('click', onGalleryListClick);
lightboxCloseBtnRef.addEventListener('click', closeLightbox);
lightboxOverlayRef.addEventListener('click', closeLightbox);

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

  currentGalleryImgRef = e.target;
  openLightboxWithCurrent();
}

function setPrevGalleryImg() {
  const prevGalleryImgRef = currentGalleryImgRef
    ?.closest('.gallery__item')
    ?.previousElementSibling?.querySelector('.gallery__image');

  if (!prevGalleryImgRef) return false;

  currentGalleryImgRef = prevGalleryImgRef;
  return true;
}

function setNextGalleryImg() {
  const nextGalleryImgRef = currentGalleryImgRef
    ?.closest('.gallery__item')
    ?.nextElementSibling?.querySelector('.gallery__image');

  if (!nextGalleryImgRef) return false;

  currentGalleryImgRef = nextGalleryImgRef;
  return true;
}

// ==================== 📌 LIGHTBOX FUNCTIONS ====================

function setLightboxImgCurrent() {
  lightboxImgRef.src = currentGalleryImgRef.dataset.source;
  lightboxImgRef.alt = currentGalleryImgRef.alt;
}

function clearLightboxImg() {
  lightboxImgRef.src = '';
  lightboxImgRef.alt = '';
}

function openLightboxWithCurrent() {
  setLightboxImgCurrent();

  window.addEventListener('keydown', onLightboxKeyDown);

  lightboxRef.classList.add('is-open');
}

function closeLightbox() {
  lightboxRef.classList.remove('is-open');

  window.removeEventListener('keydown', onLightboxKeyDown);

  clearLightboxImg();
}

function onLightboxKeyDown(e) {
  const ESC_KEY_CODE = 'Escape';
  const ARROW_LEFT_KEY_CODE = 'ArrowLeft';
  const ARROW_RIGHT_KEY_CODE = 'ArrowRight';

  switch (e.code) {
    case ESC_KEY_CODE:
      closeLightbox();
      break;
    case ARROW_LEFT_KEY_CODE:
      if (setPrevGalleryImg()) setLightboxImgCurrent();
      break;
    case ARROW_RIGHT_KEY_CODE:
      if (setNextGalleryImg()) setLightboxImgCurrent();
      break;
  }
}
