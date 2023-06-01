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
  const apiKey =
    'live_3vhXWNlt8JQtPqFQ8kBfbAmwAQugtohcG5eDIzBkWliRDkaFxffdHGM5xDJWhzJm';
  const breedUrl = `https://api.thecatapi.com/v1/breeds/${breedId}?api_key=${apiKey}`;
  const catUrl = `https://api.thecatapi.com/v1/images/${breedId}`;

  return fetch(breedUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json();
    })
    .then(breedData => {
      return fetch(catUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch cat by breed');
          }
          return response.json();
        })
        .then(catData => {
          const breedName = breedData.name || 'Unknown Breed';
          const cat = catData[0];
          return { breedName, ...cat };
        });
    })
    .catch(error => {
      throw new Error('Failed to fetch cat by breed');
    });
}
