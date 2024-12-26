import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { environment } from "../../environments/environment";
import { GameStatus, NewGameResponse, Game } from "./interfaces-and-types/game-battle";


@Injectable({
    providedIn: 'root',
})
export class GameBattleService {

    constructor(private http: HttpClient, private cookieService: CookieService) { }
    private apiUrl = environment.apiUrl;
    
    private oponentIdSubject = new BehaviorSubject<string>('');
    oponentId$ = this.oponentIdSubject.asObservable();
    private playerIdSubject = new BehaviorSubject<string>('');
    playerId$ = this.playerIdSubject.asObservable();
    private currentTurnIdSubject = new BehaviorSubject<string>('');
    currentTurnId$ = this.currentTurnIdSubject.asObservable();
    private gameStatusSubject = new BehaviorSubject<GameStatus>(GameStatus["waiting for another player"]);
    gameStatus$ = this.gameStatusSubject.asObservable();

    setGameStatus(gameStatus: GameStatus) {
        this.gameStatusSubject.next(gameStatus);
    }


    setOponentId(oponentId: string) {
        this.oponentIdSubject.next(oponentId);
    }

    setPlayerId(playerId: string) {
        this.playerIdSubject.next(playerId);
    }

    setCurrentTurnId(currentTurnId: string) {
        this.currentTurnIdSubject.next(currentTurnId);
    }

    async startGame(player1TeamId: number): Promise<NewGameResponse | null> {
        const jwt = this.cookieService.get('jwt');
        const body = {
            player1TeamId: player1TeamId
        }
        const url = `${this.apiUrl}/startGame`
        try {
            const response: any = await lastValueFrom(this.http.post<Array<any>>(url, body, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            }));
            if (!response) return null;
            return response;
        } catch (error: any) {
            console.log(error);
            return error
        }
    }

    async getGames(): Promise<Game[] | null> {
        const jwt = this.cookieService.get('jwt');
        const url = `${this.apiUrl}/games`
        try {
            const response: any = await lastValueFrom(this.http.get(url, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            }));
            if (!response) return null;
            return response;
        } catch (error: any) {
            console.log(error);
            return error
        }
    }
    async getPokemonsChanges() {
        const jwt = this.cookieService.get('jwt');
        const url = `${this.apiUrl}/pokemons`
        try {
            const response: any = await lastValueFrom(this.http.get(url, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            }));
            if (!response) return null;
            return response;
        } catch (error: any) {
            console.log(error);
            return error
        }
    }

    /*async getPokemonsByTeam(teamId:any){
        const jwt = this.cookieService.get('jwt');
        const url = `${this.apiUrl}/pokemonsByTeam/${teamId}`
        try {
            const response: any = await lastValueFrom(this.http.get(url, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            }));
            if (!response) return null;
            return response;
        } catch (error: any) {
            console.log(error);
            return error
        }

    }*/

}