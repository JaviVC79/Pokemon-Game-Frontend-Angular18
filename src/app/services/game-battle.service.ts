import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class GameBattleService {
    constructor(private http: HttpClient, private cookieService: CookieService) { }

    private oponentIdSubject = new BehaviorSubject<string>('');
    oponentId$ = this.oponentIdSubject.asObservable();
    private playerIdSubject = new BehaviorSubject<string>('');
    playerId$ = this.playerIdSubject.asObservable();
    private currentTurnIdSubject = new BehaviorSubject<string>('');
    currentTurnId$ = this.currentTurnIdSubject.asObservable();


    setOponentId(oponentId: string) {
        this.oponentIdSubject.next(oponentId);
    }

    setPlayerId(playerId: string) {
        this.playerIdSubject.next(playerId);
    }

    setCurrentTurnId(currentTurnId: string) {
        this.currentTurnIdSubject.next(currentTurnId);
    }

    async startGame(oponentId: string, playerId: string) {
        const jwt = this.cookieService.get('jwt');
        const body = {
            oponentId: oponentId,
            playerId: playerId
        }
        const url = `https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/pokemon-api/startGame`
        try {
            const response = await lastValueFrom(this.http.post<Array<any>>(url, body, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            }));
            if (!response) return null;
            return response;
        } catch (error) {
            console.log(error);
            return error
        }
    }

}