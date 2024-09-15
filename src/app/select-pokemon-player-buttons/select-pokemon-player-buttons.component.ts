import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GameService } from '../prueba/prueba.logicGame.service';

@Component({
  selector: 'app-select-pokemon-player-buttons',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './select-pokemon-player-buttons.component.html',
  styleUrl: './select-pokemon-player-buttons.component.css'
})
export class SelectPokemonPlayerComponent {
  constructor(private gameService: GameService) { }

  @Input() pokemon: any;

  addPokemonPlayer(pokemon: any) {
    this.gameService.addPokemonPlayer(pokemon)
  }

}
