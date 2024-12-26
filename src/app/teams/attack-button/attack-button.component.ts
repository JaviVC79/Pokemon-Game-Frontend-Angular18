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
import { TeamsResponse, Pokemon, Team, TeamResponse } from '../../utils/types/pokemonType';
import { SpecialPoints } from '../types/types';
import { setTimeout } from 'core-js';


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
    const specialPoints: SpecialPoints = await this.gameService.getSpecialPoints();
    specialPoints ? this.teamService.setSpecialAttackPoints(specialPoints.specialAttackPoints) : this.teamService.setSpecialAttackPoints(0);
    this.teamService.pokemons$.pipe(takeUntil(this.destroy$)).subscribe(pokemons => {
      this.pokemons = pokemons;
    });
    this.teamService.specialAttackPoints$.pipe(takeUntil(this.destroy$)).subscribe(specialAttackPoints => {
      this.specialAttackPoints = specialAttackPoints;
    });
    this.teamService.teams$.pipe(takeUntil(this.destroy$)).subscribe(teams => {
      this.teams = teams;
    });
    this.webSocketService.onAttack().pipe(takeUntil(this.destroy$)).subscribe(async (message: any) => {
      this.attackResponse = message.message;
      if (this.attackResponse === "Your opponent is not connected") { this.isAttacking = false; return; }
      if (this.attackResponse.message === "It's not your turn") { this.isAttacking = false; this.turn = false; return; }
      if (this.attackResponse.message === "You have been defeated last opponent pokemon, you have win the game" || this.attackResponse.message === "Your last pokemon has been defeated, you have lost the game") {
        await this.setDefeatedTeam();
      }
      if (!(this.attackResponse != null && this.attackResponse.message === "Your opponent is not connected")) {
        await this.updatePokemons(message);
        return;
      }
    });
    this.webSocketService.onAttackAllYourEnemies().pipe(takeUntil(this.destroy$)).subscribe(async (message: any) => {
      this.attackResponse = message.message;
      if (this.attackResponse === "Your opponent is not connected") { this.isAttacking = false; return; }
      if (this.attackResponse.message === "It's not your turn") { this.isAttacking = false; this.turn = false; return; }
      await this.updatePokemons(message);
      if (this.attackResponse.message === "You have been defeated last opponent pokemon, you have win the game" || this.attackResponse.message === "Your last pokemon has been defeated, you have lost the game") {
        await this.setDefeatedTeam();
      }
    })
    this.webSocketService.onSpecialAttack().pipe(takeUntil(this.destroy$)).subscribe(async (message: any) => {
      this.attackResponse = message.message;
      if (this.attackResponse === "Your opponent is not connected") { this.isAttacking = false; return; }
      if (this.attackResponse.message === "It's not your turn") { this.isAttacking = false; this.turn = false; return; }
      if (this.attackResponse.message === "You have been defeated last opponent pokemon, you have win the game" || this.attackResponse.message === "Your last pokemon has been defeated, you have lost the game") {
        await this.setDefeatedTeam();
      }
      if (!(this.attackResponse != null && this.attackResponse.message === "Your opponent is not connected")) {
        await this.updatePokemons(message);
        return;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @Input() pokemon?: Pokemon;
  pokemons: Pokemon[] = [];
  attackResponse?: any;
  @Input() team?: Team;
  @Input() games?: any;
  turn?: boolean;
  attackMessage?: string;
  pokemonAttackName?: string;
  teams?: TeamResponse[] | null;
  isAttacking: boolean = false;
  specialAttackPoints?: number;


  private async setDefeatedTeam() {
    const teamResponse: TeamsResponse | null = await this.gameService.getTeams();
    this.teams = teamResponse?.teams;
    this.teamService.setTeams(this.teams);
    this.webSocketService.disconnect();
    this.cookieService.delete("room");
    this.isAttacking = false;
    setTimeout(() => {
      window.location.reload();
    }, 1500)

  }

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

  async getVideo(publicId: string): Promise<string> {
    try {
      return await this.cloudinaryService.getVideoUrl(publicId);
    } catch (e) {
      console.log("error", e)
      return '/squirtle.mp4';
    }
  }

  attackAllYourEnemies() {
    this.isAttacking = true;
    this.webSocketService.attackAllYourEnemies(this.pokemon);

  }

  SpecialAttack() {
    this.isAttacking = true;
    this.webSocketService.specialAttack(this.pokemon);
  }

  async updatePokemons(message: any) {
    const pokemons = await this.gameService.getPlayerPokemons();
    this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
    this.teamService.setPokemons(this.pokemons);
    this.turn = true;
    this.attackMessage = this.attackResponse.message;
    const pokemonAttackName = message.pokemon.name
    this.pokemonAttackName = await this.getVideo(`PokemonGame/${pokemonAttackName!}`);
    this.openPokemonAttackPopup();
    this.isAttacking = false;
  }

}





