import { GameStatus } from "../../../services/interfaces-and-types/game-battle";

export interface Team {
    id: number;
    user_id: string;
    name: string;
    playerId: number;
  }
  
  export interface StatusTeams {
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