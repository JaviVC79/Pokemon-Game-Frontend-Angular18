export enum GameStatus {
    'notStarted' = 'notStarted',
    'waiting for another player' = 'waiting for another player',
    'inProgress' = 'inProgress',
    'finished' = 'finished'
}

export interface NewGameResponse {
    status: number;
    message: string;
    gameId: number
}


export interface Game {
    id: number;
    player1TeamId?: number;
    player2TeamId?: number;
    winnerId?: number;
    user_id1?: string;
    user_id2?: string;
}