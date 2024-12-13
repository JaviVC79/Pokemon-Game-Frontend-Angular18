import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/websockets.service';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../prueba/prueba.logicGame.service';
import { PopupAttackDefenseComponent } from '../../pop-ups/battle-pop-ups/popup-attack.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { CloudinaryService } from '../../services/cloudinary.service';
import { TeamsResponse } from '../../utils/types/pokemonType';

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
    private dialog: MatDialog,
    private cookieService: CookieService,
    private cloudinaryService: CloudinaryService
  ) { }

  async ngOnInit(): Promise<void> {
    this.teamService.pokemons$.pipe(takeUntil(this.destroy$)).subscribe(pokemons => {
      this.pokemons = pokemons;
    });
    this.teamService.teams$.pipe(takeUntil(this.destroy$)).subscribe(teams => {
      this.teams = teams;
    });
    this.webSocketService.onAttack().pipe(takeUntil(this.destroy$)).subscribe(async (message: any) => {
      this.attackResponse = message.message;
      if (this.attackResponse === "Your opponent is not connected") { this.isAttacking = false; return; }
      if (this.attackResponse.message === "It's not your turn") { this.isAttacking = false; this.turn = false; return; }
      if (this.attackResponse.message === "You have been defeated last opponent pokemon, you have win the game" || this.attackResponse.message === "Your last pokemon has been defeated, you have lost the game") {
        this.teams = await this.gameService.getTeams();
        console.log(this.teams)
        this.teamService.setTeams(this.teams)
        this.webSocketService.disconnect();
        this.cookieService.delete("room")
        this.isAttacking = false;
      }
      if (!(this.attackResponse != null && this.attackResponse.message === "Your opponent is not connected")) {
        const pokemons = await this.gameService.getPlayerPokemons();
        this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
        this.teamService.setPokemons(this.pokemons);
        this.turn = true;
        this.attackMessage = this.attackResponse.message;
        const pokemonAttackName = message.pokemon.name
        this.pokemonAttackName = this.getVideo(`PokemonGame/${pokemonAttackName!}`);
        this.openPokemonAttackPopup();
        this.isAttacking = false;
        return;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @Input() pokemon?: any;
  pokemons: any[] = [];
  attackResponse?: any;
  @Input() team?: any;
  @Input() games?: any;
  turn?: boolean;
  attackMessage?: string;
  pokemonAttackName?: string;
  teams?: TeamsResponse | null;
  isAttacking: boolean = false;

  sendMessage() {
    this.webSocketService.sendMessage("a ver si funciona");
    console.log("en sendMesage");
  }

  attack() {
    this.isAttacking = true;
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

  getVideo(publicId: string): string {
    return this.cloudinaryService.getVideoUrl(publicId);
  }
}





