import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/websockets.service';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../prueba/prueba.logicGame.service';
import { PopupAttackDefenseComponent } from '../../pop-ups/battle-pop-ups/popup-attack.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-defense-button',
  standalone: true,
  imports: [],
  templateUrl: './defense-button.component.html',
})
export class DefenseButtonComponent implements OnInit, OnDestroy {
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
    this.webSocketService.onDefense().pipe(takeUntil(this.destroy$)).subscribe(async (message: any) => {
      this.defenseResponse = message.message;
      console.log(this.defenseResponse.message);
      if (this.defenseResponse.message === "It's not your turn") { this.turn = false; return; }
      if (!(this.defenseResponse != null && this.defenseResponse.message === "Your opponent is not connected")) {
        const pokemons = await this.gameService.getPlayerPokemons();
        this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
        this.teamService.setPokemons(this.pokemons);
        this.turn = true;
        this.defenseMessage = this.defenseResponse.message;
        this.pokemonDefenseName = message.pokemon.name
        console.log(this.pokemonDefenseName)
        this.openPokemonDefensePopup();
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
  defenseResponse: any = null;
  @Input() team?: any;
  @Input() games?: any;
  turn?: boolean;
  defenseMessage?: string;
  pokemonDefenseName?: string;
  defense() {
    this.webSocketService.defense(this.pokemon);
  }

  openPokemonDefensePopup() {
    this.dialog.open(PopupAttackDefenseComponent, {
      data: { popupMessage: this.defenseMessage, popupVideo: this.pokemonDefenseName },
      position: { top: '30px', right: '80px' },
      disableClose: true,
      width: '600px',
      height: 'auto'
    });
  }
}

