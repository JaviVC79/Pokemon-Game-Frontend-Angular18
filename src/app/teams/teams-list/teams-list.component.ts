import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})

export class TeamsListComponent {

  @Input() pokemons?: any[];
  @Input() teamId?: any;
  @Input() pokemonId?: any;
  @Input() team?: any;
  @Input() removePokemon!: (pokemonId: number) => any;

  async callRemovePokemon(pokemonId: number) {
    if (this.removePokemon) {
      await this.removePokemon(pokemonId);
    }
  }

  getPokemonId(pokemonId: number) {
    this.pokemonId = pokemonId;
  }
}


