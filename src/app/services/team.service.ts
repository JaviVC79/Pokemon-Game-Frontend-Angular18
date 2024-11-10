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
  
  setTeamId(teamId: number, teamName: string) {
    const team: Team = {
      id: teamId,
      name: teamName
    }
    this.teamIdSubject.next(team);
  }

  setTeams(teams:any){
    this.teamsSubject.next(teams);
  }
}
