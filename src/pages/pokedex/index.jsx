import pokeapiService from '@services/pokeapi';

import PokedexState from '@contexts/pokedex/PokedexState';

import PokedexMain from '@components/pokedex/PokedexMain';

import getConfig from 'next/config';

const {
  publicRuntimeConfig: { displayLimit },
} = getConfig();
export default function PokedexPage({ pokemonsCount, pokemons }) {
  return (
    <PokedexState pokemonsCount={pokemonsCount} pokemons={pokemons}>
      <PokedexMain />
    </PokedexState>
  );
}

PokedexPage.getInitialProps = async () => {
  const pokemonsCount = await pokeapiService.getPokemonsTotalCount();
  const pokemons = await pokeapiService.getPokemons(1, displayLimit);

  return {
    pokemonsCount,
    pokemons,
  };
};
