export function fetchCountries(letter) {
  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
    letter
  )}?fields=name,capital,population,flags.svg,languages`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Country not found');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      throw new Error('Failed to fetch countries');
    });
}