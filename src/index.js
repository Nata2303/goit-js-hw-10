import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.getElementById('breed-select');
const catInfo = document.getElementById('cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function renderBreeds(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function renderCatInfo(cat) {
  const { name, description, temperament, image } = cat;

  const catMarkup = `
    <img src="${image.url}" alt="${name}" class="cat-image">
    <h2>${name}</h2>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
  `;

  catInfo.innerHTML = catMarkup;
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

function handleBreedSelectChange() {
  const breedId = breedSelect.value;

  showLoader();
  hideError();

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

  fetchBreeds()
    .then(breeds => {
      renderBreeds(breeds);
      hideLoader();
    })
    .catch(errorObj => {
      showError('Failed to fetch breeds');
      hideLoader();
    });

  breedSelect.addEventListener('change', handleBreedSelectChange);
}

initializeApp();
