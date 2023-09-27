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
  if (e[0].isIntersecting) {
    page += 1;
    fetchImgByPage(page);
  }
}

async function fetchImgByPage(page) {
  imgs = await fetchImgs(currentSearchTarget, page);
  const markup = makeMarkup(imgs.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export { makeMarkup, onSubmit, observeHandler };
