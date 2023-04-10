import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../services/pokemon-service';
  
const PokemonList: FunctionComponent = () => {

	// Importations 
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
  useEffect(() => {
    PokemonService.getPokemons().then(pokemons => setPokemons(pokemons));
  }, []);
  
  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div>
        <Link to={`/pokemons/add`} className="btn btn-floating halfway-fab waves-effect waves-light">
            <i className="material-icons">add</i>
				</Link>
      </div>
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