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

  openLightbox(e.target);
}

function getPrevGalleryImg() {
  return currentGalleryImgRef
    .closest('.gallery__item')
    .previousElementSibling?.querySelector('.gallery__image');
}

function getNextGalleryImg() {
  return currentGalleryImgRef
    .closest('.gallery__item')
    .nextElementSibling?.querySelector('.gallery__image');
}

// ==================== 📌 LIGHTBOX FUNCTIONS ====================

function openLightbox(imgRef) {
  currentGalleryImgRef = imgRef;
  lightboxImgRef.src = imgRef.dataset.source;
  lightboxImgRef.alt = imgRef.alt;

  window.addEventListener('keydown', onLightboxKeyDown);

  lightboxRef.classList.add('is-open');
}

function closeLightbox() {
  lightboxRef.classList.remove('is-open');

  window.removeEventListener('keydown', onLightboxKeyDown);

  lightboxImgRef.src = '';
  lightboxImgRef.alt = '';
  currentGalleryImgRef = null;
}

function onLightboxKeyDown(e) {
  const ESC_KEY_CODE = 'Escape';
  const ARROW_LEFT_KEY_CODE = 'ArrowLeft';
  const ARROW_RIGHT_KEY_CODE = 'ArrowRight';

  // if (e.code === ESC_KEY_CODE) closeLightbox();

  switch (e.code) {
    case ESC_KEY_CODE:
      closeLightbox();
      break;
    case ARROW_LEFT_KEY_CODE:
      console.log(getPrevGalleryImg());
      break;
    case ARROW_RIGHT_KEY_CODE:
      // console.log(currentGalleryImgRef.nextElementSibling);
      break;
  }
}
