import { Injectable } from "@angular/core";

interface pokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}
@Injectable({
    providedIn: 'root',
})
export class GameService {



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
}