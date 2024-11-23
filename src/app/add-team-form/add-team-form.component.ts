import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../prueba/prueba.logicGame.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupMaxTeamsReachedComponent } from '../pop-ups/popup-max-teams-reached.component';
import { TeamService } from '../services/team.service';


@Component({
  selector: 'add-team-form',
  standalone: true,
  imports: [FormsModule, NgIf, MatDialogModule],
  templateUrl: './add-team-form.component.html',
  styleUrl: './add-team-form.component.css'
})
export class AddTeamFormComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router, private dialog: MatDialog, private teamService: TeamService) { }
  @Output() teamsChange = new EventEmitter<any[]>();
  @Input() teams: any = [];
  team: string = '';
  isActuallyCreated: boolean = false;

  isLogin: boolean | null = null
  async ngOnInit() {
    this.isLogin = this.gameService.isLogin();
    this.teamService.teams$.subscribe(teams => {
      this.teams = teams;
    });
  }

  setTeams(teams: any) {
    this.teamService.setTeams(teams);
  }

  async onSubmit() {
    if (this.teams.length >= 5) {
      this.openPopup();
      return;
    }
    const response: any = await this.gameService.createNewTeam(this.team);
    if (response?.code === 'P2002') {
      this.isActuallyCreated = true;
      return;
    }
    const teams = await this.gameService.getTeams();
    this.teams = teams?.teams
    this.teamsChange.emit(this.teams);
    this.isActuallyCreated = false;
  }
  openPopup() {
    this.dialog.open(PopupMaxTeamsReachedComponent, {
      position: { top: '10px', right: '10px' },
      disableClose: true,
      width: '300px',
    });
  }
}
