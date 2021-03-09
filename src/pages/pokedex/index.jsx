import pokeapiService from '@services/pokeapi';

const DEFAULT_LIMIT = 5; /* This could be setted in env vars using next/getconfig */

export default function PokedexPage({ pokemonsCount, pokemons }) {
  return (
    <PokedexState pokemonsCount={pokemonsCount} pokemons={pokemons}>
      <PokedexMain />
    </PokedexState>
  );
}

export const getServerSideProps = async () => {
  const pokemonsCount = await pokeapiService.getPokemonsTotalCount();
  const pokemons = await pokeapiService.getPokemons(1, DEFAULT_LIMIT);

  return {
    props: { pokemonsCount, pokemons },
  };
};
