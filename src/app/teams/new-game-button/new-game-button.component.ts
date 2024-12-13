import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameBattleService, GameStatus, NewGameResponse, Game } from '../../services/game-battle.service';
import { WebSocketService } from '../../services/websockets.service';
import { CookieService } from 'ngx-cookie-service';

interface Team {
  id: number;
  user_id: string;
  name: string;
  playerId: number;
}

interface StatusTeams {
  teamId: number;
  gameStatus: GameStatus;
}

export interface GameState {
  id: number;
  player1TeamId: number | null;
  player2TeamId: number | null;
  winnerId: number | null;
  user_id1: string | null;
  user_id2: string | null;
}


@Component({
  selector: 'app-new-game-button',
  standalone: true,
  templateUrl: './new-game-button.component.html',
})
export class NewGameButtonComponent implements OnInit {
  constructor(private gameBattleService: GameBattleService,
    private cookieService: CookieService,
    private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.gameBattleService.gameStatus$.subscribe(gameStatus => {
      this.gameStatus = gameStatus;
    });
    this.webSocketService.onJoinRoom().subscribe((room: string) => {
      this.webSocketService.joinRoom();
    });

    this.webSocketService.onRestoreGame().subscribe((state: GameState) => {
      this.restoreGame(state);
    });
    this.webSocketService.onMessage().subscribe((message: string) => {
      console.log('Received message:', message);
    });
  }

  restoreGame(state: GameState) {
    this.gameState = state;
    console.log('Game state restored:', this.gameState);
  }

  saveGame() {
    this.webSocketService.saveGame(this.gameState);
  }

  gameState: GameState = {
    id: 0,
    player1TeamId: null,
    player2TeamId: null,
    winnerId: null,
    user_id1: null,
    user_id2: null
  };
  gameResume: any = null;
  gameStatus: GameStatus = GameStatus.notStarted;
  gameStatusTeams: StatusTeams[] = [];
  @Input() teams: Team[] | undefined;
  @Input() team: Team | undefined;
  @Input() teamId: number = 0;
  @Input() pokemons: any[] = [];
  @Input() games: Game[] | null = [];
  newGameData: any;

  @Output() battleTeam1 = new EventEmitter<number>();

  sendBattleTeam1(battleTeam1: number) {
    this.battleTeam1.emit(battleTeam1);
  }


  sendMessage(room: string = 'testRoom', message: string = '') {
    const element = document.getElementById('test-input') as HTMLInputElement;
    message = element.value;
    if (message == "") return;
    this.webSocketService.sendMessage(message);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') { this.sendMessage(this.newGameData?.gameId.toString()); }
  }

  async startNewGame(team: Team) {
    const newGameResponse: NewGameResponse | null = await this.gameBattleService.startGame(team.id);
    this.newGameData = newGameResponse;
    if (!newGameResponse) return;
    const gameId: string = newGameResponse.gameId.toString();
    if (newGameResponse.message === "waiting for another player, check later please") {
      this.updateGameStatusTeams(team.id, GameStatus['waiting for another player'], gameId);
      this.webSocketService.connect();
      this.webSocketService.joinRoom();
    } else if (newGameResponse.message === "game started") {
      this.updateGameStatusTeams(team.id, GameStatus.inProgress, gameId);
      this.webSocketService.connect();
      this.webSocketService.joinRoom();
    }
  }

  private updateGameStatusTeams(teamId: number, status: GameStatus, gameId: string) {
    this.gameBattleService.setGameStatus(status);
    const existingTeam = this.gameStatusTeams.find(team => team.teamId === teamId);
    if (existingTeam) {
      existingTeam.gameStatus = status;
    } else {
      this.gameStatusTeams.push({ teamId: teamId, gameStatus: status });
    }
    this.cookieService.set('room', gameId);
    this.webSocketService.joinRoom();
  }


}
