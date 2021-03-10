import Axios from 'axios';

import { range } from '@helpers/arrays';

import getConfig from 'next/config';

const { publicRuntimeConfig: {pokeapiURL, displayLimit} } = getConfig();
const axios = Axios.create({ baseURL: pokeapiURL });

const pokeapiService = {
  getPokemonsTotalCount: () => {
    return axios
      .get('pokemon?offset=0&limit=1')
      .then(resp => resp.data.count)
      .catch((error) => console.log(error.status));
  },
  getPokemons: (fromId, uptoId) => {
    return Promise.all(
      range(fromId, uptoId).map((id) => axios.get(`pokemon/${id}/`))
    )
      .then((responses) => responses.map((response) => response.data))
      .catch((error) => console.log(error.status));
  },
};

export default pokeapiService;
