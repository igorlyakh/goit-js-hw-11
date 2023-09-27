import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImgs } from './api';
import { refs } from './refs';

let page = 1;

const observe = new IntersectionObserver(observeHandler);

let currentSearchTarget = '';

function makeMarkup(imagesArr) {
  return imagesArr
    .map(image => {
      return `
      <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
             <b>Likes: ${image.likes}</b>
            </p>
            <p class="info-item">
              <b>Views: ${image.views}</b>
            </p>
            <p class="info-item">
              <b>Comments: ${image.comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads: ${image.downloads}</b>
            </p>
          </div>
      </div>
    `;
    })
    .join('');
}

function onSubmit(e, dataHandler) {
  e.preventDefault();
  Loading.arrows();
  currentSearchTarget = e.target.elements.searchQuery.value;
  if (currentSearchTarget === '') {
    Loading.remove();
    Notify.failure('Please enter your request correctly!');
    return;
  }
  page = 1;
  dataHandler(currentSearchTarget);

  e.target.reset();
  observe.observe(refs.trigger);
  return currentSearchTarget;
}

function observeHandler(e) {
  e.forEach(item => {
    if (item.isIntersecting) {
      page += 1;
      fetchImgByPage(page);
    }
  });
}
async function fetchImgByPage(page) {
  imgs = await fetchImgs(currentSearchTarget, page);
  const markup = makeMarkup(imgs.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  const totalPages = Math.floor(imgs.total / 40);
  if (page >= 3) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
  if (page === totalPages) {
    observe.disconnect();
  }
}

export { makeMarkup, onSubmit, observeHandler };
