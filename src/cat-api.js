export function fetchBreeds() {
  const apiKey =
    'live_3vhXWNlt8JQtPqFQ8kBfbAmwAQugtohcG5eDIzBkWliRDkaFxffdHGM5xDJWhzJm';
  const url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${apiKey}`;

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
  const url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${apiKey}&breed_id=${breedId}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json();
    })
    .then(data => data[0])
    .catch(error => {
      throw new Error('Failed to fetch cat by breed');
    });
}
