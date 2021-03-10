import React, { useReducer } from "react";

import PokedexContext from "./PokedexContext";
import PokedexReducer from "./PokedexReducer";

import {
  LOAD_POKEMONS_START,
  LOAD_POKEMONS_READY,
  LOAD_POKEMONS_ERROR,
  LOAD_POKEMONS_DETAILS_START,
  LOAD_POKEMONS_DETAILS_READY,
  LOAD_POKEMONS_DETAILS_ERROR,
  LOAD_POKEMON_DETAILS_START,
  LOAD_POKEMON_DETAILS_READY,
  LOAD_POKEMON_DETAILS_ERROR,
  LOAD_SINGLE_POKEMON_START,
  LOAD_SINGLE_POKEMON_READY,
  LOAD_SINGLE_POKEMON_ERROR,
} from "./PokedexTypes";

import getConfig from 'next/config';

const { publicRuntimeConfig: { display_limit } } = getConfig();

const PokedexState = ({ pokemonsCount, pokemons, children }) => {
  const initialState = {
    withError: false,
    error: null,
    isReady: true,
    count: 0,
    nextUrl: "/pokemon?limit=5",
    previousUrl: null,
    currentUrl: "/pokemon?limit=5",
    pokemons: pokemons,
    currentPokemon: null,

    offset: 0,
    pokemonsCount: pokemonsCount
  };

  const [state, dispatch] = useReducer(PokedexReducer, initialState);

  //functions
  const fetchNext = () => {

  };

  const fetchPrevious = () => {

  };

  const loadPokemonAbilities = (pokemon) => {
    return Promise.all(
      pokemon.abilities.map((ab) => pokeapi.get(ab.ability.url))
    )
      .then((res) => {
        const abilities = res.map((resp) => resp.data);
        pokemon.expanded_abilities = abilities;
        pokemon.parsedStats = parseStats(pokemon.stats);

        dispatch({
          type: LOAD_POKEMON_DETAILS_READY,
          payload: pokemon,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOAD_POKEMON_DETAILS_ERROR,
          payload: error,
        });
      });
  };

  const fetchPokemonDetails = (name) => {
    dispatch({
      type: LOAD_POKEMON_DETAILS_START,
    });

    let pokemon = state.pokemons.find((pok) => pok.name === name);

    if (!pokemon) {
      dispatch({
        type: LOAD_SINGLE_POKEMON_START
      });

      pokeapi.get(`/pokemon/${name}`).then((res) => {
        dispatch({
          type: LOAD_SINGLE_POKEMON_READY
        });

        pokemon = res.data;
        loadPokemonAbilities(pokemon);

      }).catch((error) => {
        dispatch({
          type: LOAD_SINGLE_POKEMON_ERROR,
          payload: error
        })
      });
    } else {
      loadPokemonAbilities(pokemon);
    }
  };

  return (
    <PokedexContext.Provider
      value={{
        withError: state.withError,
        isReady: state.isReady,
        pokemons: state.pokemons,
        hasPrevious: state.previousUrl !== null,
        hasNext: state.nextUrl !== null,
        currentPokemon: state.currentPokemon,
        fetchNext: fetchNext,
        fetchPrevious: fetchPrevious,
        fetchPokemonDetails: fetchPokemonDetails,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export default PokedexState;
