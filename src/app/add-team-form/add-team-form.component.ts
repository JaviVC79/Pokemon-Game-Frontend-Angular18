import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../prueba/prueba.logicGame.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from '../pop-ups/app-popup.component';


@Component({
  selector: 'add-team-form',
  standalone: true,
  imports: [FormsModule, NgIf, MatDialogModule],
  templateUrl: './add-team-form.component.html',
  styleUrl: './add-team-form.component.css'
})
export class AddTeamFormComponent {
  constructor(private gameService: GameService, private router: Router, private dialog: MatDialog) { }
  @Output() teamsChange = new EventEmitter<any[]>();
  teams: any = [];
  team: string = '';

  isLogin: boolean | null = null
  async ngOnInit() {
    this.isLogin = this.gameService.isLogin();
    const teams = await this.gameService.getTeams();
    this.teams = teams?.teams
  }

  async onSubmit() {
    if (this.teams.length >= 5) {
      this.openPopup();
      return;
    }
    const response = await this.gameService.createNewTeam(this.team);
    console.log(response)
    const teams = await this.gameService.getTeams();
    this.teams = teams?.teams
    this.teamsChange.emit(this.teams);
  }
  openPopup() {
    this.dialog.open(PopupComponent, {
      position: { top: '10px', right: '10px' },
      disableClose: true,
      width: '300px',
    });
  }
}
