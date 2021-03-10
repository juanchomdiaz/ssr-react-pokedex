import React, { useContext, Fragment } from "react";

import PokedexContext from "@contexts/pokedex/PokedexContext";

import PokemonCard from "@components/pokedex/PokemonCard/PokemonCard";

import { Spinner } from "react-bootstrap";
import "./PokemonList.module.scss";

const PokemonList = () => {
  const { pokemons } = useContext(PokedexContext);

  return (
    <Fragment>
      {pokemons.lenght!==0 ? (
        <div className="card-grid">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="danger" />
        </div>
      )}
    </Fragment>
  );
};

export default PokemonList;
