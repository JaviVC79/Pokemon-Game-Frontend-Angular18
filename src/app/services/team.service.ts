import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface Team {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamIdSubject = new BehaviorSubject<Team>({ id: 0, name: '' });
  teamId$ = this.teamIdSubject.asObservable();

  private teamsSubject = new BehaviorSubject<any>([]);
  teams$ = this.teamsSubject.asObservable();

  private pokemonsInTeamSubject = new BehaviorSubject<any>([]);
  pokemonsInTeam$ = this.pokemonsInTeamSubject.asObservable();

  private pokemonsSubject = new BehaviorSubject<any>([]);
  pokemons$ = this.pokemonsSubject.asObservable();

  private specialDefensePointsSubject = new BehaviorSubject<any>([]);
  specialDefensePoints$ = this.specialDefensePointsSubject.asObservable();

  private specialAttackPointsSubject = new BehaviorSubject<any>([]);
  specialAttackPoints$ = this.specialAttackPointsSubject.asObservable();

  setTeamId(teamId: number, teamName: string) {
    const team: Team = {
      id: teamId,
      name: teamName
    }
    this.teamIdSubject.next(team);
  }

  setTeams(teams: any) {
    this.teamsSubject.next(teams);
  }

  setPokemonsInTeam(pokemons: any) {
    this.pokemonsInTeamSubject.next(pokemons);
  }

  setPokemons(pokemons: any) {
    this.pokemonsSubject.next(pokemons);
  }

  setSpecialDefensePoints(specialDefensePoints: number) {
    this.specialDefensePointsSubject.next(specialDefensePoints);
  }

  setSpecialAttackPoints(specialAttackPoints: number) {
    this.specialAttackPointsSubject.next(specialAttackPoints);
  }

}
