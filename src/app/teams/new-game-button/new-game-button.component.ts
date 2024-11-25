import { Component, Input, OnInit } from '@angular/core';
import { GameBattleService, GameStatus, NewGameResponse, Game } from '../../services/game-battle.service';

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
export class NewGameButtonComponent implements OnInit {
  constructor(private gameBattleService: GameBattleService) { }
  gameStatus: string = '';
  ngOnInit(): void {
    this.gameBattleService.gameStatus$.subscribe(gameStatus => {
      this.gameStatus = gameStatus;
    });
  }


  gameStatusTeams: any[] = [];
  @Input() teams: Team[] | undefined;
  @Input() team: Team | undefined;
  @Input() teamId: number = 0;
  @Input() pokemons: any[] = [];
  @Input() games: Game[] | null = [];
  


  /*async startNewGame(teamId: number) {
    const newGameResponse: NewGameResponse | null = await this.gameBattleService.startGame(teamId);
    if (!newGameResponse) return;
    if (newGameResponse.message = "waiting for another player, check later please") { 
      this.gameBattleService.setGameStatus(GameStatus.waiting);
      this.gameStatusTeams.push({teamId:teamId, gameStatus:GameStatus.waiting})
    } else if(newGameResponse.message = "game started") {
      this.gameBattleService.setGameStatus(GameStatus.inProgress);
      this.gameStatusTeams.push({teamId:teamId, gameStatus:GameStatus.inProgress})
    }
  }*/
  async startNewGame(teamId: number) {
    const newGameResponse: NewGameResponse | null = await this.gameBattleService.startGame(teamId);
    if (!newGameResponse) return;

    if (newGameResponse.message === "waiting for another player, check later please") {
      this.updateGameStatusTeams(teamId, GameStatus['waiting for another player']);
    } else if (newGameResponse.message === "game started") {
      this.updateGameStatusTeams(teamId, GameStatus.inProgress);
    }
  }

  private updateGameStatusTeams(teamId: number, status: GameStatus) {
    this.gameBattleService.setGameStatus(status);
    const existingTeam = this.gameStatusTeams.find(team => team.teamId === teamId);
    if (existingTeam) {
      existingTeam.gameStatus = status;
    } else {
      this.gameStatusTeams.push({ teamId: teamId, gameStatus: status });
    }
  }


}
