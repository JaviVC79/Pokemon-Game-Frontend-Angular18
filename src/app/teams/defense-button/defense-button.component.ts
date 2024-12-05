import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websockets.service';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../prueba/prueba.logicGame.service';

@Component({
  selector: 'app-defense-button',
  standalone: true,
  imports: [],
  templateUrl: './defense-button.component.html',
})
export class DefenseButtonComponent implements OnInit{

  constructor(private webSocketService: WebSocketService,
    private teamService: TeamService,
    private gameService: GameService
  ) { }

  async ngOnInit(): Promise<void> {
    this.teamService.pokemons$.subscribe(pokemons => {
      this.pokemons = pokemons;
    });
    this.webSocketService.onDefense().subscribe(async (message: any) => {
      this.defenseResponse = message;
      console.log(this.defenseResponse.message)
      if (!(this.defenseResponse != null && this.defenseResponse.message === "Your opponent is not connected")) {
        const pokemons = await this.gameService.getPlayerPokemons();
        this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
        this.teamService.setPokemons(this.pokemons);
      }
    });
  }
  @Input() pokemon: any = null;
  pokemons: any[] = [];
  defenseResponse: any = null;
  @Input() team?: any;
  @Input() games?: any;


  defense() {
    this.webSocketService.defense(this.pokemon);
  }


}
