import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { TeamsResponse } from "../utils/types/pokemonType";
import { GameBattleService } from "../services/game-battle.service";
import { environment } from "../../environments/environment";

interface pokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

type StatsDto = {
    hp: number;
    attack: number;
    specialAttack: number;
    defense: number;
    specialDefense: number;
    speed: number;
}

type PokemonDto = {
    id: number;
    name: string;
    statsId: number;
    types: string;
    abilities: string;
    moves: string;
    teamId: number;
}

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private http: HttpClient, 
        private gameBattleService: GameBattleService,
        private cookieService: CookieService) { }
        private apiUrl = environment.apiUrl;

    player1: string = "";
    player2: string = "";
    player1Score: number = 0;
    player2Score: number = 0;
    player1Turn?: boolean;
    player2Turn?: boolean;
    player1Moves: string[] = [];
    player2Moves: string[] = [];
    player1MovesString: string = "";
    player2MovesString: string = "";
    player1Teams: string[] = [];
    player2Teams: string[] = [];
    player1TeamsString: string = "";
    player2TeamsString: string = "";
    player1PokemonStats: pokemonStats[] = [];
    player2PokemonStats: pokemonStats[] = [];
    player1PokemonStatsString: string = "";
    player2PokemonStatsString: string = "";
    player1PokemonMoves: string[] = [];
    player2PokemonMoves: string[] = [];
    player1PokemonMovesString: string = "";
    player2PokemonMovesString: string = "";
    player1PokemonMovesString2: string = "";
    player2PokemonMovesString2: string = "";


    addPokemonPlayer(pokemon: any) {
        //console.log(pokemon)
        //console.log(this.player1PokemonStats.length)
        //console.log(this.player2PokemonStats.length)
        if (!localStorage.getItem('player1PokemonStats') && this.player1PokemonStats.length >= 6) {
            this.player1PokemonStats.length = 0;
            this.player1PokemonStats = [];
            //console.log(this.player1PokemonStats)

        }
        if (!localStorage.getItem('player2PokemonStats') && this.player2PokemonStats.length >= 6) {
            this.player2PokemonStats.length = 0;
            this.player2PokemonStats = [];
            //console.log(this.player2PokemonStats)
        }
        if (this.player1PokemonStats.length < 6 || this.player2PokemonStats.length < 6) {
            if (this.player1Turn === undefined) {
                this.player1Turn = true;
                this.player2Turn = false
            }
            if (this.player1Turn === true) {
                this.player1PokemonStats.push(pokemon.stats.map((stat: any) => stat.base_stat));
                this.player1Moves.push(pokemon.moves.map((move: any) => move.move.name));
                if (this.player1PokemonStats.length === 6) {
                    const stats1 = this.player1PokemonStatsString = this.player1PokemonStats.join(', ');
                    this.player1MovesString = this.player1Moves.join(', ');
                    localStorage.setItem('player1PokemonStats', stats1);
                }
            } else {
                this.player2PokemonStats.push(pokemon.stats.map((stat: any) => stat.base_stat));
                this.player2Moves.push(pokemon.moves.map((move: any) => move.move.name));
                if (this.player2PokemonStats.length === 6) {
                    const stats2 = this.player2PokemonStatsString = this.player2PokemonStats.join(', ');
                    this.player2MovesString = this.player2Moves.join(', ');
                    localStorage.setItem('player2PokemonStats', stats2);
                }
            }
            this.player1Turn = !this.player1Turn;
            this.player2Turn = !this.player2Turn;
        }
    }

    async getPokemon(pokemon: any): Promise<any> {
        const stats: StatsDto = {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            specialAttack: pokemon.stats[3].base_stat,
            specialDefense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat,
        }
        const selectedPokemon: Partial<PokemonDto> = {
            name: pokemon.name,
            types: pokemon.types.map((type: any) => type.type.name).join(', '),
            abilities: pokemon.abilities.map((ability: any) => ability.ability.name).join(', '),
            moves: pokemon.moves.map((move: any) => move.move.name).join(', '),
        };
        const body = [selectedPokemon, stats];
        return body
    }

    async createNewTeam(teamName: string) {
        if (teamName === '') return;
        const jwt = this.cookieService.get('jwt');
        const body = {
            name: teamName
        }
        const url = `${this.apiUrl}/team`
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

    async createNewPokemon(pokemon: string[], teamId: number) {
        const jwt = this.cookieService.get('jwt');
        const body = pokemon
        const url = `${this.apiUrl}/pokemon/${teamId}`
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

    isLogin(): boolean | null {
        if (this.cookieService.get('jwt')) {
            return true;
        } else {
            return false;
        }
    }

    async getTeams(): Promise<TeamsResponse | null> {
        const jwt = this.cookieService.get('jwt'); {
            const url = `${this.apiUrl}/teams`
            try {
                const response: any = await lastValueFrom(this.http.get<Array<any>>(url, {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${jwt}`
                    }
                }));
                if (!response) return null;
                return response;
            } catch (error) {
                console.log(error);
                return null
            }
        }

    }
    async getPlayerPokemons() {
        const jwt = this.cookieService.get('jwt'); {
            const url = `${this.apiUrl}/pokemons`
            try {
                const response: any = await lastValueFrom(this.http.get<Array<any>>(url, {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${jwt}`
                    }
                }));
                if (!response) return null;
                return response;
            } catch (error) {
                console.log(error);
                return null
            }
        }
    }

    async removeTeam(teamId: number) {
        const jwt = this.cookieService.get('jwt'); {
            const url = `${this.apiUrl}/team/${teamId}`
            try {
                const response: any = await lastValueFrom(this.http.delete<Array<any>>(url, {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${jwt}`
                    }
                }));
                if (!response) return null;
                return response;
            } catch (error) {
                console.log(error);
                return null
            }
        }
    }

    async removePokemon(pokemonId: number) {
        const jwt = this.cookieService.get('jwt'); {
            const url = `${this.apiUrl}/pokemon/${pokemonId}`
            try {
                const response: any = await lastValueFrom(this.http.delete<Array<any>>(url, {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${jwt}`
                    }
                }));
                if (!response) return null;
                return response;
            } catch (error) {
                console.log(error);
                return null
            }
        }
    }
}