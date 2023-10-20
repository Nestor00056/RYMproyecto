const consultApi = (page) => {
  return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `el error es: ${response.statusText} y el codigo es: ${response.status}`
        );
      }

      return response.json();
    })
    .catch((error) => {});
};

module.exports = { consultApi };
