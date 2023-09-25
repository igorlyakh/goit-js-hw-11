import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

function onClick(e, dataHandler) {
  e.preventDefault();
  Loading.arrows();
  const searchQuery = e.target.elements.searchQuery;
  if (searchQuery.value === '') {
    Loading.remove();
    Notify.failure('Please enter your request correctly!');
    return;
  }
  dataHandler(searchQuery.value);
  e.target.reset();
}

export { makeMarkup, onClick };
