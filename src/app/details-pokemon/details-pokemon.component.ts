import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { StatsPokemonComponent } from '../stats-pokemon/stats-pokemon.component';
import { TypesPokemonComponent } from '../types-pokemon/types-pokemon.component';
import { AbilitiesPokemonComponent } from '../abilities-pokemon/abilities-pokemon.component';
import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { SelectPokemonPlayerComponent } from '../select-pokemon-player-buttons/select-pokemon-player-buttons.component';
import { PokemonService } from '../services/api.service';
import Atropos from 'atropos';
import 'atropos/css'

@Component({
  selector: 'app-details-pokemon',
  standalone: true,
  imports: [AbilitiesPokemonComponent, TypesPokemonComponent, StatsPokemonComponent, SelectPokemonPlayerComponent,
    NgSwitchCase, NgSwitch, NgFor, NgIf, NgClass,
  ],
  providers: [
    PokemonService,
  ],
  templateUrl: './details-pokemon.component.html',
  styleUrl: './details-pokemon.component.css'
})
export class DetailsPokemonComponent implements AfterViewInit{
  constructor(private pokemonService: PokemonService) { }
  ngAfterViewInit(): void {
    const myAtropos = Atropos({
      el: '.card',
      activeOffset: 40,
      shadowScale: 1.05,
      onEnter() {
        
      },
      onLeave() {
        
      },
      onRotate(x, y) {
        
      }
    });
  }

 
  isReverse: boolean = false;
  @Input() pokemon: any;
  @Output() isClicked = new EventEmitter<boolean>();
  pokemonDetail: string = "stats";
  pokemonDetailMoveEffect: string | null = null;
  pokemonDetailMoveName: string | null = null;


  clickBack() {
    this.isClicked.emit(false);
  }

  handlepokemonsDetails(details: string) {
    this.pokemonDetail = details;
  }
  clickReverse() {
    this.isReverse = !this.isReverse;
  }
  async getAttacksEffects(attackUrl: string) {
    const response: any = await this.pokemonService.getAttacksEffects(attackUrl);
    //console.log(response)
    this.pokemonDetailMoveEffect = response?.effect_entries[0]?.effect;
    this.pokemonDetailMoveName = response?.name;
    //console.log(this.pokemonDetailMoveEffect);
  }

}
