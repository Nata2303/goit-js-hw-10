export function fetchBreeds() {
  const apiKey =
    'live_3vhXWNlt8JQtPqFQ8kBfbAmwAQugtohcG5eDIzBkWliRDkaFxffdHGM5xDJWhzJm';
  const url = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds');
      }
      return response.json();
    })
    .catch(error => {
      throw new Error('Failed to fetch breeds');
    });
}

export function fetchCatByBreed(breedId) {
  const catUrl = `https://api.thecatapi.com/v1/images/${breedId}`;

  return fetch(catUrl).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch cat by breed');
    }
    return response.json();
  });
}
