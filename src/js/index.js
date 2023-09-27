import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchImgs } from './api';
import { makeMarkup, onSubmit } from './func';
import { refs } from './refs';

// TODO: Добавить функцию большого просмотра изображений

//? Как прокидывать глобальную переменную дальше?
let page = 1;

async function dataHandler(searchTarget) {
  try {
    const imgs = await fetchImgs(searchTarget, page);
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
  //? Подумать как убрать тут колбэк
  page = 1;
  onSubmit(e, dataHandler);
});
