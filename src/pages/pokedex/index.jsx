import pokeapiService from '@services/pokeapi';

import getConfig from 'next/config';

const { publicRuntimeConfig: { display_limit } } = getConfig();

export default function PokedexPage({ pokemonsCount, pokemons }) {
  return (
    <PokedexState pokemonsCount={pokemonsCount} pokemons={pokemons}>
      <PokedexMain />
    </PokedexState>
  );
}

export const getServerSideProps = async () => {
  const pokemonsCount = await pokeapiService.getPokemonsTotalCount();
  const pokemons = await pokeapiService.getPokemons(1, display_limit);

  return {
    props: { pokemonsCount, pokemons },
  };
};
