const { response } = require("express");

const consultApi = (id) => {
  return fetch(`https://rickandmortyapi.com/api/character/${id}`)
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
