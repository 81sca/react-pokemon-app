import React, { FunctionComponent } from 'react';
import PokemonsDetail from './pages/pokemon-details';
import PokemonEdit from './pages/pokemon-edit';
import PokemonAdd from './pages/pokemon-add';
import PokemonList from './pages/pokemon-list';
import PageNotFound from './pages/page-not-found';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
  
const App: FunctionComponent = () => {
	return (
		<Router>
			<div>
				{/* La barre de navigation */}
				<nav>
					<div className="nav-wrapper teal">
						<Link to="/" className="brand-logo center">Pokédex</Link>
					</div>
				</nav>
				{/* Le système de gestion des routes */}
				<Switch>
					<Route exact path="/" component={PokemonList}></Route>
					<Route exact path="/pokemons" component={PokemonList}></Route>
					<Route exact path="/pokemons/add" component={PokemonAdd}></Route>
					<Route exact path="/pokemons/:id" component={PokemonsDetail}></Route>
					<Route exact path="/pokemons/edit/:id" component={PokemonEdit}></Route>
					<Route component={PageNotFound}></Route> {/* Cas par défaut */}
				</Switch>
			</div>
		</Router>
 	)
}

export default App;