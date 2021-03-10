import React, { useReducer } from "react";

import PokedexContext from "./PokedexContext";
import PokedexReducer from "./PokedexReducer";

import {
  LOAD_POKEMONS_START,
  LOAD_POKEMONS_READY,
  LOAD_POKEMON_DETAILS_START,
  LOAD_POKEMON_DETAILS_READY,
  LOAD_POKEMON_DETAILS_ERROR,
  LOAD_SINGLE_POKEMON_START,
  LOAD_SINGLE_POKEMON_READY,
  LOAD_SINGLE_POKEMON_ERROR,
} from "./PokedexTypes";

import pokeapiService from '@services/pokeapi';

import getConfig from 'next/config';

const { publicRuntimeConfig: { displayLimit } } = getConfig();

const PokedexState = ({ pokemonsCount, pokemons, children }) => {
  const initialState = {
    withError: false,
    isReady: true,
    pokemons: pokemons,
    currentPokemon: null,

    currentStartId: 1,
    currentEndId: displayLimit,
    pokemonsCount: pokemonsCount,
    canNext: true,
    canPrevious: false
  };

  const [state, dispatch] = useReducer(PokedexReducer, initialState);

  const fetchNext = () => {
    let newStartId = state.currentStartId + displayLimit;
    let newEndId = state.currentEndId + displayLimit;

    if(newEndId > state.pokemonsCount) newEndId = state.pokemonsCount; 

    _loadPokemons(newStartId, newEndId);
  };

  const fetchPrevious = () => {
    let newStartId = state.currentStartId - displayLimit;
    let newEndId = state.currentStartId - 1;

    _loadPokemons(newStartId, newEndId);
  };

  const _loadPokemons = async (startId, endId) => {
    dispatch({
      type: LOAD_POKEMONS_START,
    });

    let pokemons = await pokeapiService.getPokemons(startId, endId);

    dispatch({
      type: LOAD_POKEMONS_READY,
      payload: {
        pokemons, 
        currentStartId: startId,
        currentEndId: endId,
        canNext: (endId !== state.pokemonsCount),
        canPrevious: (startId !== 1)
      },
    });
  }

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
        hasPrevious: state.canPrevious,
        hasNext: state.canNext,
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
