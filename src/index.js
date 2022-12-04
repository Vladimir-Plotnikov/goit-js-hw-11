import Notiflix from 'notiflix';
const axios = require('axios').default;

const refs = {
    searchForm: document.querySelector('#search-form'),
    searchButton: document.querySelector('.button'),
    galleryList: document.querySelector('.gallery'),
    loadButton: document.querySelector('.load-more')
};

const API_SOURCE = 'https://pixabay.com/api/';
const API_KEY = '?key=31700021-8a08f2640b9bfb55478a6fa5d&';
const API_REQUEST = '&image_type=photo&orientation=horizontal&safesearch=true';
const PAGE = '&page=';
const PER_PAGE = '&per_page=40';
let PAG = 1;
let picName = '';
let totalDownloads = 0;

refs.searchForm.addEventListener('submit', onSearch)
refs.loadButton.addEventListener('click', loadMore, onSearch)

// ========== load more BUTTON ==================
function loadMore(e) {
    e.preventDefault();
    PAG += 1;
    fetchPics(picName)
}
// ===========================

// ========== Search BUTTON ==================

function onSearch(e) {
    e.preventDefault();
    refs.galleryList.innerHTML = '';
    const form = e.currentTarget;
    picName = form.elements.searchQuery.value;
    fetchPics(picName);
}
// ===========================


async function fetchPics(picName) {
    const response = await axios.get(`${API_SOURCE}${API_KEY}q=${picName}${API_REQUEST}${PAGE}${PAG}${PER_PAGE}`);

    // if (!response.ok) {
    //     console.log('error');
    // }

    const picInfo = response.data;
    for (const key in picInfo.hits) {
        const picItems = picInfo.hits[key];
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = picItems;
        const markUpList = `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="img-item" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
        refs.galleryList.insertAdjacentHTML('beforeend', markUpList);
    }
    totalDownloads += picInfo.hits.length;
 
    // ========== do something with api ============

    if (picInfo.hits.length === 0) {
        refs.loadButton.classList.remove('is-visible');
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    if (totalDownloads > picInfo.totalHits) {
        refs.loadButton.classList.remove('is-visible');
        return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");

    }
    refs.loadButton.classList.add('is-visible');
}
