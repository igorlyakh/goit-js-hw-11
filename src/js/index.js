import { fetchImgs } from './api';
import makeMarkup from './func';
import { refs } from './refs';

// console.log(fetchImgs('flower'));
// makeMarkup();

async function dataHandler() {
  try {
    const imgs = await fetchImgs('dog');
    refs.gallery.innerHTML = makeMarkup(imgs.hits);
  } catch (error) {
    console.log(error);
  }
}

dataHandler();
