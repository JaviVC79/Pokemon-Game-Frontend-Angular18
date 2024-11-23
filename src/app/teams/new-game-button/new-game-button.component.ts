import { Component, Input } from '@angular/core';

interface Team {
  id: number;
  user_id: string;
  name: string;
  playerId: number;
}


@Component({
  selector: 'app-new-game-button',
  standalone: true,
  templateUrl: './new-game-button.component.html',
  styleUrl: './new-game-button.component.css'
})
export class NewGameButtonComponent {
  @Input() team: Team | undefined;
  @Input() teamId: number = 0;
  @Input() pokemons: any[] = [];

  startNewGame(team: Team) {
    
    console.log("New game started with team id:" + team.id +" user_id: "+team.user_id + " name: "+team.name+" playerId: "+team.playerId)
  }



}
