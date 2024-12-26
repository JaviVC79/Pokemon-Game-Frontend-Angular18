import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GameService } from '../prueba/prueba.logicGame.service';
import { TeamService } from '../services/team.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupPokemonAddedComponent } from '../pop-ups/popup-pokemonAdded.component';
import { Team } from '../services/interfaces-and-types/team';



@Component({
  selector: 'app-select-pokemon-player-buttons',
  standalone: true,
  imports: [MatIcon, NgIf],
  templateUrl: './select-pokemon-player-buttons.component.html',
  styleUrl: './select-pokemon-player-buttons.component.css'
})

export class SelectPokemonPlayerComponent implements OnInit {
  team!: Team;
  teams!: any;
  @Input() pokemon: any;
  isLogin: boolean | null = null;
  isMaxPokemonsReached: boolean = false;

  constructor(private gameService: GameService, private teamService: TeamService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.teamService.teamId$.subscribe(team => {
      this.team = team;
    });
    this.teamService.teams$.subscribe(teams => {
      this.teams = teams;
    });
    this.authService.loggedIn$.subscribe((status) => {
      this.isLogin = status;
    });
  }
  ngDoCheck() {
    this.isLogin = this.authService.isLogin();
  }


  async addPokemon(pokemon: any, team: Team) {
    const pokemonNumbers = await this.getNumberPokemonsInTeam(team);
    if (pokemonNumbers >= 5) {
      this.isMaxPokemonsReached = true;
      return;
    }
    const selectedPokemon = await this.gameService.getPokemon(pokemon);
    const response: any = await this.gameService.createNewPokemon(selectedPokemon, this.team.id);
    if (response!.status == 201) {
      this.openPokemonAddedPopup()
    }
  }

  openPokemonAddedPopup() {
    this.dialog.open(PopupPokemonAddedComponent, {
      position: { top: '30px', right: '80px' },
      disableClose: true,
      width: '400px',
    });
  }

  async getNumberPokemonsInTeam(team: Team) {
    const response = await this.gameService.getPlayerPokemons();
    const playerPokemons = response.pokemonsAndStats;
    const pokemonsInTeam = playerPokemons.filter((pokemon: any) => pokemon.teamId === team.id);
    return pokemonsInTeam.length
  }

  async removePokemon(pokemon: any) {
    await this.gameService.removePokemon(pokemon.id)
  }

}


