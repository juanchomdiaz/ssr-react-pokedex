import Axios from 'axios';

import { range } from '@helpers/arrays';

import getConfig from 'next/config';

const { publicRuntimeConfig: {pokeapiURL, displayLimit} } = getConfig();
const axios = Axios.create({ baseURL: pokeapiURL });

const pokeapiService = {
  getPokemonsTotalCount: async () => {
    return await axios
      .get('pokemon?offset=0&limit=1')
      .then(resp => resp.data.count)
      .catch((error) => console.log(error.response.status));
  },
  getPokemons: async (fromId, uptoId) => {
    return await Promise.all(
      range(fromId, uptoId).map((id) => axios.get(`pokemon/${id}/`))
    )
      .then((responses) => responses.map((response) => response.data))
      .catch((error) => console.log(error.response.status));
  },
};

export default pokeapiService;
