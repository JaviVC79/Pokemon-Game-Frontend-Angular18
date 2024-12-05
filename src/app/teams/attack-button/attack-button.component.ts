import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websockets.service';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../prueba/prueba.logicGame.service';

@Component({
  selector: 'app-attack-button',
  standalone: true,
  imports: [],
  templateUrl: './attack-button.component.html',
})
export class AttackButtonComponent implements OnInit {
  constructor(private webSocketService: WebSocketService,
    private teamService: TeamService,
    private gameService: GameService
  ) { }

  async ngOnInit(): Promise<void> {
    this.teamService.pokemons$.subscribe(pokemons => {
      this.pokemons = pokemons;
    });
    this.webSocketService.onAttack().subscribe(async (message: any) => {
      this.attackResponse = message;
      if (!(this.attackResponse != null && this.attackResponse.message === "Your opponent is not connected")) {
        const pokemons = await this.gameService.getPlayerPokemons();
        this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
        this.teamService.setPokemons(this.pokemons);
      }
    });
  }

  @Input() pokemon: any = null;
  pokemons: any[] = [];
  attackResponse: any = null;
  @Input() team?: any;
  @Input() games?: any;


  sendMessage() {
    this.webSocketService.sendMessage("a ver si funciona")
    console.log("en sendMesage")
  }

  attack() {
    this.webSocketService.attack(this.pokemon);
  }
}




