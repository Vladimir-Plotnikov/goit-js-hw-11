import Notiflix from 'notiflix';

const refs = {
    searchForm: document.querySelector('#search-form'),
    searchButton: document.querySelector('.button'),
    galleryList: document.querySelector('.gallery')

};

const API_SOURCE = 'https://pixabay.com/api/'
const API_KEY = '?key=31700021-8a08f2640b9bfb55478a6fa5d&';
const API_REQUEST = '&image_type=photo&orientation=horizontal&safesearch=true'
const picName = ''



console.dir(refs.galleryList);
console.dir(refs.searchButton);
console.dir(refs.searchForm);

refs.searchForm.addEventListener('submit', onSearch)

function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const picName = form.elements.searchQuery.value
    console.dir(fetchPics(picName));
}

function fetchPics(picName) {
    return fetch(`${API_SOURCE}${API_KEY}q=${picName}${API_REQUEST}`)
        .then((response) => {
            if (!response.ok) {
                console.log('error');
            }
            // console.log(response.json);
            return response.json();
        }).then((picInfo) => {
            console.log(picInfo);
            console.log(picInfo.hits.length);
            for (const key in picInfo.hits) {
                const picItems = picInfo.hits[key]
                const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = picItems;
                const markUpList = `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
</div>`
                
// ========== if api send nothing it will return message ============
                
if (picInfo.hits.length === 0) {
   Notiflix.Notify.failure('шось нічого не має!');
}
                Notiflix.Notify.success('ВАААУУУ');
                refs.galleryList.insertAdjacentHTML('beforeend', markUpList) 
            }
        }
        )
}


// console.log('qweqwe');