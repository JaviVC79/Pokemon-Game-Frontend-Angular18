import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../prueba/prueba.logicGame.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'add-team-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-team-form.component.html',
  styleUrl: './add-team-form.component.css'
})
export class AddTeamFormComponent {
  constructor(private gameService: GameService) { }

  team: string = '';
  
  isLogin: boolean | null = null
  ngOnInit() {
    this.isLogin = this.gameService.isLogin()
  }

  onSubmit() {
    console.log('Form submitted');
    this.gameService.createNewTeam(this.team)
  }
}
