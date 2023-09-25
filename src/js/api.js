import axios from 'axios';

const API_KEY = '39646619-6193c852a9d975ef65f643313';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImgs(target) {
  const options = {
    key: API_KEY,
    q: target,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  };

  const params = new URLSearchParams(options);

  const res = await axios.get(`${BASE_URL}?${params}`);
  const images = await res.data;
  // console.log(images);
  return images;
}

export { fetchImgs };
