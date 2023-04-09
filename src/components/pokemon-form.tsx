import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import PokemonService from '../services/pokemon-service';

type Props = {
  pokemon: Pokemon
};

type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
};

type Form = {
  name: Field,
  hp: Field,
  cp: Field,
  types: Field
}
  
const PokemonForm: FunctionComponent<Props> = ({pokemon}) => {
  
  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

  const [form, setForm] = useState<Form>({
    name: {value : pokemon.name, isValid: true},
    hp: {value : pokemon.hp, isValid: true},
    cp: {value : pokemon.cp, isValid: true},
    types: {value : pokemon.types, isValid: true}
  });

	const history = useHistory();

  const hasType = (type:string) : boolean => {
    return form.types.value.includes(type);
  }

  const selectType = (type:string, e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		let newField: Field;

		if (checked) {
			// Si l'utilisateur coche une case, ajouter à la liste des types du pokémon.
			const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes }
		} else {
			// Si l'utilisateur décoche une case, la retirer de la liste des types du pokémon.
      const newTypes: string[] = form.types.value.filter((currentType:string) => currentType !== type);
      newField = { value: newTypes }
		}
    // On remet à jour le state du formulaire
    setForm({...form, ...{types: newField}});
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = {[fieldName]: { value: fieldValue }};
    // On met à jour le state du champ
    setForm({...form, ...newField});
  }

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValidForm = validateForm();

    if (isValidForm) {
      pokemon.name = form.name.value;
      pokemon.hp = form.hp.value;
      pokemon.cp = form.cp.value;
      pokemon.types = form.types.value;
      PokemonService.updatePokemon(pokemon).then(() => history.push(`/pokemons/${pokemon.id}`));
    }
	}

	const validateForm = () => {
		let newForm: Form = form;

		// validation du champ Nom
		// name ne doit contenir que des lettres ou éèà
		// la longueur de name doit être comprise entre 3 et 25
		if (!/^[a-zA-Zéèà ]{3,25}$/.test(form.name.value)) {
			const errorMsg:string = "Le nom du pokémon (3-25) ne peut contenir que des lettres ou les caractères 'é', 'è', 'à''";
			const newField:Field = { value:form.name.value, error:errorMsg, isValid:false};
			newForm = {...newForm, ...{name: newField}};
		} else {
			const newField:Field = { value:form.name.value, isValid:true};
			newForm = {...newForm, ...{name: newField}};
		}

		// validation du champ Point de vie
		// hp ne doit contenir que chiffres
		// la longueur de hp doit être comprise entre 1 et 3
		if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
			const errorMsg:string = "Les points de vie du pokémon (1-3) ne peut contenir que des chiffres";
			const newField:Field = { value:form.hp.value, error:errorMsg, isValid:false};
			newForm = {...newForm, ...{hp: newField}};
		} else {
			const newField:Field = { value:form.hp.value, isValid:true};
			newForm = {...newForm, ...{hp: newField}};
		}

		// validation du champ Dégâts
		// cp ne doit contenir que des lettres ou éèà
		// la longueur de cp doit être comprise entre 1 et 2
		if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
			const errorMsg:string = "Les dégats du pokémon (1-2) ne peut contenir que des chiffres";
			const newField:Field = { value:form.cp.value, error:errorMsg, isValid:false};
			newForm = {...newForm, ...{cp: newField}};
		} else {
			const newField:Field = { value:form.cp.value, isValid:true};
			newForm = {...newForm, ...{cp: newField}};
		}

		setForm(newForm);
		return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
	}

  // Validation des types du pokémon.
  const isTypesValid = (type: string):boolean => {

    // cas où l'utilisateur décoche un type alors qu'il n'y en a qu'un.
    if(form.types.value.length === 1 && hasType(type)) {
      return false;
    }

    // cas où l'utilisateur coche un type alors qu'ill y en a déjà trois.
    if(form.types.value.length >= 3 && !hasType(type)) {
      return false;
    }
    return true;
  }

  const deletePokemon = () => {
    PokemonService.deletePokemon(pokemon).then(() => history.push(`/pokemons`));
  }
  
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
              <span className="btn btn-floating halfway-fab waves-effect waves-light">
                <i onClick={deletePokemon} className="material-icons">delete</i>
              </span>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                  {form.name.error &&
                    <div className="card-panel red accent-1">
                      {form.name.error}
                    </div>
                  }
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                  {form.hp.error &&
                    <div className="card-panel red accent-1">
                      {form.hp.error}
                    </div>
                  }
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                  {form.cp.error &&
                    <div className="card-panel red accent-1">
                      {form.cp.error}
                    </div>
                  }
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  { // On parcourt la liste des types du Pokémon
                    types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)} checked={hasType(type)} onChange={ e => selectType(type, e)} ></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;