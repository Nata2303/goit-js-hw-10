import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.getElementById('breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function renderBreeds(breeds) {
  breedSelect.innerHTML = breeds
    .map(
      breed =>
        `<option value="${breed.reference_image_id}">${breed.name}</option>`
    )
    .join('');
}

function renderCatInfo(cat) {
  const { breeds, url } = cat;

  const catMarkup = `
    <img src="${url}" alt="${breeds[0].name}" width="400">
    <div class="cat-description">
      <h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p><span>Temperament:</span> ${breeds[0].temperament}</p>
    </div>
  `;

  catInfo.innerHTML = catMarkup;
  catInfo.style.display = 'block';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError(message) {
  error.textContent = message;
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

function hideCatInfo() {
  catInfo.innerHTML = '';
  catInfo.style.display = 'none';
}

function handleBreedSelectChange(event) {
  const breedId = event.target.value;

  showLoader();
  hideError();
  hideCatInfo();

  catInfo.style.display = 'none';
  
  fetchCatByBreed(breedId)
    .then(cat => {
      renderCatInfo(cat);
      hideLoader();
    })
    .catch(errorObj => {
      showError('Failed to fetch cat by breed');
      hideLoader();
    });
}

function initializeApp() {
  showLoader();
  hideError();
  breedSelect.setAttribute('hidden', 'true');


  fetchBreeds()
    .then(breeds => {
      renderBreeds(breeds);
      hideLoader();
      breedSelect.removeAttribute('hidden');
    })
    .catch(errorObj => {
      showError('Failed to fetch breeds');
      hideLoader();
    });

  breedSelect.addEventListener('change', handleBreedSelectChange);
}

initializeApp();
