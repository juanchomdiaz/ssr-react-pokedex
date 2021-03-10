import Axios from 'axios';

import { range } from '@helpers/arrays';

import getConfig from 'next/config';

const { publicRuntimeConfig: {pokeapiURL, displayLimit} } = getConfig();
const axios = Axios.create({ baseURL: pokeapiURL });

const pokeapiService = {
  getPokemonsTotalCount: async () => {
    try {
      const resp = await axios
        .get('pokemon?offset=0&limit=1');
      return resp.data.count;
    } catch (error) {
      return console.log(error.status);
    }
  },
  getPokemons: async (fromId, uptoId) => {
    try {
      const responses = await Promise.all(
        range(fromId, uptoId).map((id) => axios.get(`pokemon/${id}/`))
      );
      return responses.map((response) => response.data);
    } catch (error) {
      return console.log(error.status);
    }
  },
};

export default pokeapiService;
