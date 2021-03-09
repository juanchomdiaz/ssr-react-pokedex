import axios from '@libraries/axios';
import range from '@helpers/arrays';

const axios = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
}); /* API url could be setted in env vars using next/getconfig */

export const pokeapiService = {
  getPokemonsTotalCount: async () => {
    return await axios
      .get('api/v2/pokemon?offset=0&limit=1')
      .then((resp) => resp.data.count)
      .catch(() => {});
  },
  getPokemons: async (offset, limit) => {
    return await Promise.all(
      range(offset, limit).map((id) => axios.get(`api/v2/pokemon/${id}/`))
    )
      .then((responses) => responses.map((response) => response.data))
      .catch(() => {});
  },
};

export default pokeapiService;
