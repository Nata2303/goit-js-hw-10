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
    .then(data => data)
    .catch(error => {
      throw new Error('Failed to fetch breeds');
    });
}

export function fetchCatByBreed(breedId) {
  const apiKey =
    'live_3vhXWNlt8JQtPqFQ8kBfbAmwAQugtohcG5eDIzBkWliRDkaFxffdHGM5xDJWhzJm';
  const breedUrl = `https://api.thecatapi.com/v1/breeds/${breedId}?api_key=${apiKey}`;
  const catUrl = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=${apiKey}`;

  return Promise.all([fetch(breedUrl), fetch(catUrl)])
    .then(responses => {
      const [breedResponse, catResponse] = responses;

      if (!breedResponse.ok || !catResponse.ok) {
        throw new Error('Failed to fetch cat by breed');
      }

      return Promise.all([breedResponse.json(), catResponse.json()]);
    })
    .then(data => {
      const [breedData, catData] = data;
      const breedName = breedData[0].name || 'Unknown Breed';
      const cat = catData[0];

      return { breedName, ...cat };
    })
    .catch(error => {
      throw new Error('Failed to fetch cat by breed');
    });
}
