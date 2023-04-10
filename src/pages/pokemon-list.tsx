import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../services/pokemon-service';
  
const PokemonList: FunctionComponent = () => {

	// Importations 
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
  useEffect(() => {
    PokemonService.getPokemons().then(pokemons => setPokemons(pokemons));
  }, []);

  const addPokemon = () => {

  }
  
  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <span className="btn btn-floating halfway-fab waves-effect waves-light">
        <i onClick={addPokemon} className="material-icons">add</i>
      </span>
      <div className="container">
        <div className="row">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        </div>
      </div>
    </div>
  );
}
  
export default PokemonList;