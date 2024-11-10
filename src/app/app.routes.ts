import { Routes } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { createPlayerFormComponent } from './create-player-form/create-player-form.component';
import { DetailsPokemonComponent } from './details-pokemon/details-pokemon.component';
import { LoginPlayerFormComponent } from './login-player-form/login-player-form.component';
import { TeamsComponent } from './teams/teams.component';

export const routes: Routes = [{ path: 'pokemons', component: PruebaComponent }, 
{ path: 'createPlayerForm', component: createPlayerFormComponent },
{ path: 'pokemonDetails', component: DetailsPokemonComponent },
{ path: 'login', component: LoginPlayerFormComponent },
{ path: 'teams', component: TeamsComponent },
];
