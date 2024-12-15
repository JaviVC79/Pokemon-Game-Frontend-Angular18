import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/websockets.service';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../prueba/prueba.logicGame.service';
import { PopupAttackDefenseComponent } from '../../pop-ups/battle-pop-ups/popup-attack.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CloudinaryService } from '../../services/cloudinary.service';
import { SpecialPoints } from '../types/types';
import { Pokemon, Team } from '../../utils/types/pokemonType';

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
    private dialog: MatDialog,
    private cloudinaryService: CloudinaryService
  ) { }

  async ngOnInit(): Promise<void> {
    const specialPoints: SpecialPoints = await this.gameService.getSpecialPoints();
    specialPoints ? this.teamService.setSpecialDefensePoints(specialPoints.specialDefensePoints) : this.teamService.setSpecialDefensePoints(0);
    this.teamService.pokemons$.pipe(takeUntil(this.destroy$)).subscribe(pokemons => {
      this.pokemons = pokemons;
    });
    this.teamService.specialDefensePoints$.pipe(takeUntil(this.destroy$)).subscribe(specialDefensePoints => {
      this.specialDefensePoints = specialDefensePoints;
    });
    this.webSocketService.onDefense().pipe(takeUntil(this.destroy$)).subscribe(async (message: any) => {
      this.defenseResponse = message.message;
      if (this.defenseResponse === "Your opponent is not connected") {
        this.isDefending = false;
        return;
      }
      if (this.defenseResponse.message === "It's not your turn") { this.isDefending = false; this.turn = false; return; }
      if (!(this.defenseResponse != null && this.defenseResponse.message === "Your opponent is not connected")) {
        console.log(this.defenseResponse.message)
        const pokemons = await this.gameService.getPlayerPokemons();
        this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
        this.teamService.setPokemons(this.pokemons);
        this.turn = true;
        this.defenseMessage = this.defenseResponse.message;
        const pokemonDefenseName = message.pokemon.name
        this.pokemonDefenseName = this.getVideo(`PokemonGame/${pokemonDefenseName!}`);
        this.openPokemonDefensePopup();
        this.isDefending = false;
        if (this.defenseMessage !== "You are too tired, your defense is not effective.") {
          const specialPoints: SpecialPoints = this.defenseResponse.specialPointsPlayer;
          this.teamService.setSpecialDefensePoints(specialPoints.specialDefensePoints);
          console.log(this.specialDefensePoints)
        }
        return;
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @Input() pokemon!: Pokemon;
  pokemons: Pokemon[] = [];
  defenseResponse?: any;
  @Input() team?: Team;
  @Input() games?: any;
  turn?: boolean;
  defenseMessage?: string;
  pokemonDefenseName?: string;
  isDefending: boolean = false;
  specialDefensePoints?: number;

  defense() {
    this.isDefending = true;
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
  getVideo(publicId: string): string {
    return this.cloudinaryService.getVideoUrl(publicId);
  }

}

