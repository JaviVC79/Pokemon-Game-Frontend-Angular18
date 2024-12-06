import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/websockets.service';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../prueba/prueba.logicGame.service';
import { PopupAttackDefenseComponent } from '../../pop-ups/battle-pop-ups/popup-attack.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-attack-button',
  standalone: true,
  imports: [],
  templateUrl: './attack-button.component.html',
})
export class AttackButtonComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private webSocketService: WebSocketService,
    private teamService: TeamService,
    private gameService: GameService,
    private dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    this.teamService.pokemons$.pipe(takeUntil(this.destroy$)).subscribe(pokemons => {
      this.pokemons = pokemons;
    });
    this.webSocketService.onAttack().pipe(takeUntil(this.destroy$)).subscribe(async (message: any) => {
      this.attackResponse = message.message;
      console.log(this.attackResponse.message);
      if (this.attackResponse.message === "It's not your turn") { this.turn = false; return; }
      if (!(this.attackResponse != null && this.attackResponse.message === "Your opponent is not connected")) {
        const pokemons = await this.gameService.getPlayerPokemons();
        this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
        this.teamService.setPokemons(this.pokemons);
        this.turn = true;
        this.attackMessage = this.attackResponse.message;
        this.pokemonAttackName = message.pokemon.name
        console.log(this.pokemonAttackName)
        this.openPokemonAttackPopup();
        return;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @Input() pokemon: any = null;
  pokemons: any[] = [];
  attackResponse: any = null;
  @Input() team?: any;
  @Input() games?: any;
  turn?: boolean;
  attackMessage?: string;
  pokemonAttackName?:string;

  sendMessage() {
    this.webSocketService.sendMessage("a ver si funciona");
    console.log("en sendMesage");
  }

  attack() {
    this.webSocketService.attack(this.pokemon);
  }

  openPokemonAttackPopup() {
    this.dialog.open(PopupAttackDefenseComponent, {
      data: { popupMessage: this.attackMessage, popupVideo: this.pokemonAttackName },
      position: { top: '30px', right: '80px' },
      disableClose: true,
      width: '600px',
      height: 'auto'
    });
  }
}





