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
  getPokemons: async (offset) => {
    try {
      const pagerResponse = await axios.get(`pokemon?offset=${offset}&limit=${displayLimit}`);

      const pokemonResponses = await Promise.all(
        pagerResponse.data.results.map((result) => axios.get(`pokemon/${result.name}/`))
      );

      return pokemonResponses.map((response) => response.data);

    } catch (error) {
      return console.log(error.status);
    }
  },
};

export default pokeapiService;
