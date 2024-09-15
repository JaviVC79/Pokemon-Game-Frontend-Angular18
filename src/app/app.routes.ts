import { Routes } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { prueba2Component } from './prueba2/prueba2.component';
import { DetailsPokemonComponent } from './details-pokemon/details-pokemon.component';

export const routes: Routes = [{ path: 'prueba', component: PruebaComponent }, { path: 'prueba2', component: prueba2Component },
{ path: 'pokemonDetails', component: DetailsPokemonComponent },
];
