import { Component, OnInit } from '@angular/core';
import { GameService } from '../prueba/prueba.logicGame.service';
import { NgFor, NgIf } from '@angular/common';
import { TeamsResponse } from '../utils/types/pokemonType';
import { TeamService } from '../services/team.service';
import { AddTeamFormComponent } from '../add-team-form/add-team-form.component';
import { Router } from '@angular/router';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { TeamsListComponent } from "./teams-list/teams-list.component";
import { NewGameButtonComponent } from "./new-game-button/new-game-button.component";
import { Game } from '../services/game-battle.service';
import { GameBattleService } from '../services/game-battle.service';


export interface Team {
  id: number;
  name: string;
}


@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [NgFor, NgIf, AddTeamFormComponent, VgCoreModule, VideoPlayerComponent, TeamsListComponent, NewGameButtonComponent],
  templateUrl: './teams.component.html',
})

export class TeamsComponent implements OnInit {
  teams: any | null = null;
  pokemons: any[] = [];
  teamId: number = 0;
  teamCompletedId: number = 0;
  pokemonId: number = 0;
  completedTeamsId: any[] = [];
  completedTeams: any[] = [];
  incompletedTeams: any[] = [];
  games: Game[] | null = [];
  battleTeam1: number = 0;
  battleTeam2: number = 0;

  constructor(private gameService: GameService,
    private gameBattleService: GameBattleService,
    private teamService: TeamService, private router: Router
  ) { }

  async ngOnInit() {
    try {
      await Promise.all([this.getTeams(), this.getPlayerPokemons()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    this.teamService.pokemons$.subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }

  async onTeamsChange(newTeams: any[]) {
    this.teams = newTeams;
    try {
      await Promise.all([this.getTeams(), this.getPlayerPokemons()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async getTeams() {
    const teams: TeamsResponse | null = await this.gameService.getTeams();
    this.teams = teams?.teams;
    this.setTeams(this.teams);
  }

  async getPlayerPokemons() {
    const pokemons = await this.gameService.getPlayerPokemons();
    if (pokemons?.pokemonsAndStats) {
      this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
      // Contar las ocurrencias de cada teamId
      this.teamService.setPokemons(this.pokemons);
      const teamIdCounts = this.pokemons.reduce((acc, pokemon) => {
        acc[pokemon.teamId] = (acc[pokemon.teamId] || 0) + 1;
        return acc;
      }, {});
      // Obtener los teamId que se repiten cinco o más veces
      const frequentTeamIds = Object.keys(teamIdCounts).filter(teamId => teamIdCounts[teamId] >= 5);
      this.completedTeams = frequentTeamIds.map(teamId => this.teams.find((team: any) => team.id === parseInt(teamId)));
      this.incompletedTeams = [...this.teams].filter(team => !frequentTeamIds.includes(team.id.toString()));
      this.completedTeamsId = frequentTeamIds;
      this.games = await this.getGames();
      if (this.games && this.games[0]) {
        this.completedTeamsId.push(this.games[0].player1TeamId);
        this.completedTeamsId.push(this.games[0].player2TeamId);
        this.battleTeam1 = this.games![0].player1TeamId!;
        this.battleTeam2 = this.games![0].player2TeamId!;
      }
      this.teamService.setPokemonsInTeam(this.completedTeamsId);
    }
  }

  async getGames() {
    const games: Game[] | null = await this.gameBattleService.getGames();
    return games;
  }

  async removeTeam(teamId: number) {
    await this.gameService.removeTeam(teamId);
    await this.getTeams();
    await this.getPlayerPokemons();
  }

  async removePokemon(pokemonId: number) {
    await this.gameService.removePokemon(pokemonId);
    await this.getPlayerPokemons();
  }

  gotoPokemons() {
    this.router.navigateByUrl('/pokemons');
  }

  getPokemonId(pokemonId: number) {
    this.pokemonId = pokemonId;
  }

  selectTeam(teamId: number, teamName: string) {
    this.teamService.setTeamId(teamId, teamName);
    this.teamId = teamId;
  }
  selectCompletedTeam(teamId: number) {
    this.teamService.setTeamId(0, '');
    this.teamId = teamId;
  }

  setTeams(teams: any) {
    this.teamService.setTeams(teams);
  }

  async setBattleTeam1(battleTeam1:number){
    this.battleTeam1=battleTeam1;
    await this.getPlayerPokemons();
  }

}
