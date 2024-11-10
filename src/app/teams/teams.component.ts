import { Component, OnInit } from '@angular/core';
import { GameService } from '../prueba/prueba.logicGame.service';
import { NgFor, NgIf } from '@angular/common';
import { TeamsResponse } from '../utils/types/pokemonType';
import { TeamService } from '../services/team.service';
import { AddTeamFormComponent } from '../add-team-form/add-team-form.component';
import { Router } from '@angular/router';

export interface Team {
  id: number;
  name: string;
}

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [NgFor, NgIf, AddTeamFormComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit {
  teams: any | null = null;
  pokemons: any[] = [];
  teamId: number = 0;
  constructor(private gameService: GameService, private teamService: TeamService, private router: Router) { }

  ngOnInit() {
    this.getTeams();
    this.getPlayerPokemons();
  }

  onTeamsChange(newTeams: any[]) {
    this.teams = newTeams;
  }
  async getTeams() {
    const teams: TeamsResponse | null = await this.gameService.getTeams();
    this.teams = teams?.teams;
    this.setTeams(teams);
  }

  async getPlayerPokemons() {
    const pokemons = await this.gameService.getPlayerPokemons();
    if (pokemons?.pokemonsAndStats) {
      this.pokemons = pokemons.pokemonsAndStats.sort((a: any, b: any) => a.teamId - b.teamId);
    }
  }

  async removeTeam(teamId: number) {
    await this.gameService.removeTeam(teamId);
    await this.getTeams();
  }

  gotoPokemons() {
    this.router.navigateByUrl('/pokemons');
  }

  selectTeam(teamId: number, teamName: string) {
    this.teamService.setTeamId(teamId, teamName);
    this.teamId = teamId;
  }

  setTeams(teams: any) {
    this.teamService.setTeams(teams);
  }

}
