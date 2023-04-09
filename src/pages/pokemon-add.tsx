import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import PokemonForm from '../components/pokemon-form';
  
const PokemonAdd: FunctionComponent = () => {

	const [id] = useState<number>(new Date().getTime());
	const [pokemon] = useState<Pokemon>(new Pokemon(id));

  return (
    <div>
        <h2 className="header center">Ajouter un Pokemon</h2>
        <PokemonForm pokemon={pokemon} isEditForm={false}/>
    </div>
  );
}
  
export default PokemonAdd;