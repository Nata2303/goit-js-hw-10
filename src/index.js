import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');

const renderCountryList = countries => {
  const countriesMarkup = countries
    .map(
      country =>
        `<div><img src="${country.flags.svg}" alt="${country.name.official}" />${country.name.official}</div>`
    )
    .join('');
  countryList.innerHTML = countriesMarkup;
};

const renderCountryInfo = country => {
  const languages = country.languages.map(language => language.name).join(', ');

  const countryMarkup = `
    <div>
      <img src="${country.flags.svg}" alt="${country.name.official}" />
      <h2>${country.name.official}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population}</p>
      <p><strong>Languages:</strong> ${languages}</p>
    </div>
  `;
  countryInfo.innerHTML = countryMarkup;
};

const handleSearch = debounce(() => {
  const searchQuery = searchBox.value.trim();

  if (searchQuery === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      } else if (countries.length >= 2 && countries.length <= 10) {
        const filteredCountries = countries.filter(country => {
          const countryName = country.name.common.toLowerCase();
          return countryName.startsWith(searchQuery.toLowerCase());
        });
        renderCountryList(filteredCountries);
        countryInfo.innerHTML = '';
      } else if (countries.length === 1) {
        renderCountryInfo(countries[0]);
        countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}, DEBOUNCE_DELAY);

searchBox.addEventListener('input', handleSearch);