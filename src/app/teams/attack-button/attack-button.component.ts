import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebSocketService } from '../../services/websockets.service';
import { Game, GameBattleService } from '../../services/game-battle.service';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../prueba/prueba.logicGame.service';

@Component({
  selector: 'app-attack-button',
  standalone: true,
  imports: [],
  templateUrl: './attack-button.component.html',
  styleUrl: './attack-button.component.css'
})
export class AttackButtonComponent implements OnInit {
  constructor(private webSocketService: WebSocketService,
    private gameBattleService: GameBattleService,
    private teamService: TeamService,
    private gameService: GameService
  ) { }

  async ngOnInit(): Promise<void> {
    this.teamService.pokemons$.subscribe(pokemons => {
      this.pokemons = pokemons;
    });
    /*this.webSocketService.onMessage().subscribe((message: any) => {
      console.log('Received message in attack-button-component:', message);
    });*/
    this.webSocketService.onAttack().subscribe(async (message: any) => {
      this.attackResponse = message;
      if (!(this.attackResponse != null && this.attackResponse.message === "Your opponent is not connected")) {
        const pokemons = await this.gameService.getPlayerPokemons();
        this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
        this.teamService.setPokemons(this.pokemons);
      }
      //console.log('Received message in attack-button-component:', message);
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



/*import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebSocketService } from '../../services/websockets.service';
import { Game, GameBattleService } from '../../services/game-battle.service';

@Component({
  selector: 'app-attack-button',
  standalone: true,
  imports: [],
  templateUrl: './attack-button.component.html',
  styleUrl: './attack-button.component.css'
})
export class AttackButtonComponent implements OnInit {
  constructor(private webSocketService: WebSocketService,
    private gameBattleService: GameBattleService
  ) { }

  async ngOnInit(): Promise<void> {
    this.webSocketService.onAttack().subscribe((message: any) => {
      console.log('Received message in attack-button-component:', message);
    });
  }

  @Input() pokemon: any = null;
  @Input() pokemons: any[] = [];
  @Output() pokemonsChange = new EventEmitter<any[]>();

  //games: Game[] | null = null;

  async sendPokemonsChange() {
    this.pokemonsChange.emit(this.pokemons);
  }

  async attack(pokemon: any) {
    this.webSocketService.attack("", pokemon);
    //this.pokemons = await this.gameBattleService.getPokemonsChanges();
  }


}*/
