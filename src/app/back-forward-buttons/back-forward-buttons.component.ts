import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PokemonService } from '../services/api.service';


@Component({
  selector: 'app-back-forward-buttons',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './back-forward-buttons.component.html',
})
export class BackForwardButtonsComponent {
  @Output() offsetChange = new EventEmitter<number>();
  @Output() limitChange = new EventEmitter<number>();

  constructor(private pokemonService: PokemonService) { }
  pokemons: any[] | null = [];
  offset: number = localStorage.getItem('offset') ? Number(localStorage.getItem('offset')) : 0;
  limit: number = localStorage.getItem('limit') ? Number(localStorage.getItem('limit')) : 99;
  
  async getBackPokemons() {
    this.offset -= 99;
    if (this.offset <= -1) {
      this.offset = 1287;
    }
    this.offsetChange.emit(this.offset);
    this.pokemons = await this.pokemonService.getPokemons(this.offset, this.limit)
  }
  async getForwardPokemons() {
    this.offset += 99; if (this.offset > 1287) {
      this.offset = 0;
    } 
    this.offsetChange.emit(this.offset);
    this.pokemons = await this.pokemonService.getPokemons(this.offset, this.limit)
  }
}
