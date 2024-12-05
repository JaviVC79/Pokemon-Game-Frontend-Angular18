import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { BackForwardButtonsComponent } from '../back-forward-buttons/back-forward-buttons.component';
import { DetailsPokemonComponent } from '../details-pokemon/details-pokemon.component';
import { GameService } from './prueba.logicGame.service';




export interface Data {
  count: number;
  next: string;
  previous: null | string;
  results: any[];
}
interface Afecting_moves {
  decrease: Decrease[];
  increase: Increase[];
}

interface Decrease {
  damage_class: {
    name: string;
    url: string;
  };
  move: {
    name: string;
    url: string;
  };
}

interface Increase {
  damage_class: {
    name: string;
    url: string;
  };
  move: {
    name: string;
    url: string;
  };
}

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  standalone: true,
  imports: [CommonModule,
    MatSlideToggleModule, MatIconModule, MatDividerModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatMenuModule,
    BackForwardButtonsComponent,
    DetailsPokemonComponent,
  ],
})
export class PruebaComponent implements OnInit {
  data: Data | null = null;
  pokemons: any[] | null = [];
  moves: any[] | null = [];
  
  constructor(private pokemonService: PokemonService, private gameService: GameService) { }
 
  
  async ngOnInit() {
    localStorage.getItem('offset') ? Number(localStorage.getItem('offset')) : localStorage.setItem('offset', '0');
    localStorage.getItem('limit') ? Number(localStorage.getItem('limit')) : localStorage.setItem('limit', '99');
    this.pokemons = await this.pokemonService.getPokemons(this.offset, this.limit)
    if (!this.pokemons) {
      return null;
    }
    this.moves = this.pokemons?.map(pokemon => pokemon.moves)
    //console.log(this.moves)
    return
  }

  gameLogic() {
    this.gameService.player1 = "Javi";
  }
  
  title: string = 'prueba';
  isAttackPressed = false;
  attackstats: Afecting_moves | null = null;
  attacks_increase: any[] | null = [];
  attacks_decrease: any[] | null = [];
  pokemon_id: number | null = null;
  offset: number = localStorage.getItem('offset') ? Number(localStorage.getItem('offset')) : 0;
  limit: number = localStorage.getItem('limit') ? Number(localStorage.getItem('limit')) : 99;
  isClicked = false;
  clicked_id: number | null = null;
  pokemon: any | null = null;
  pokemonDetail: string = "stats";
  

  async clickCard(id: number) {
    this.clicked_id = id;
    this.isClicked = !this.isClicked;
    this.pokemon = await this.pokemonService.getPokemon(id);
  }
  clickCardBack(cliked?: boolean): void {
    !cliked ? this.isClicked = !this.isClicked : this.isClicked = cliked;
    //console.log(this.isClicked)
  }


  async changeAttack(url: string, pokemon_id: number) {
    this.pokemon_id = pokemon_id;
    this.attackstats = await this.pokemonService.getPokemonsAttackstats(url)
    //console.log(this.attackstats)
    if (!this.attackstats) {
      return null;
    }
    this.attacks_decrease = this.attackstats.decrease;
    this.attacks_increase = this.attackstats.increase;
    //console.log(this.attacks_decrease)
    //console.log(this.attacks_increase)
    this.isAttackPressed = !this.isAttackPressed;
    return
  }
  manejarLimit(nuevoLimit: number) {
    console.log('Nuevo offset:', nuevoLimit);
  }

  manejarOffset(nuevoOffset: number) {
    //console.log('Nuevo offset:', nuevoOffset);
    this.offset = nuevoOffset;
    this.ngOnInit();
  }

  handlepokemonsDetails(details: string) {
    this.pokemonDetail = details;
  }

}



