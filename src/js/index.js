import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchImgs } from './api';
import { makeMarkup, onClick } from './func';
import { refs } from './refs';

async function dataHandler(searchTarget) {
  try {
    const imgs = await fetchImgs(searchTarget);
    if (imgs.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    refs.gallery.innerHTML = makeMarkup(imgs.hits);
    Notify.success(`Hooray! We found ${imgs.totalHits} images.`);
  } catch (error) {
    Notify.failure('Oops, something went wrong. Try reloading the page!');
  } finally {
    Loading.remove();
  }
}

refs.form.addEventListener('submit', e => {
  onClick(e, dataHandler);
});
