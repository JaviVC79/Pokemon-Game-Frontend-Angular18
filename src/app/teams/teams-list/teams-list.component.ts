import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AttackButtonComponent } from "../attack-button/attack-button.component";
import { TeamService } from '../../services/team.service';
import { GameBattleService } from '../../services/game-battle.service';
import { Game } from '../../services/game-battle.service';
import { DefenseButtonComponent } from '../defense-button/defense-button.component';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [NgFor, NgIf, AttackButtonComponent, DefenseButtonComponent],
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})

export class TeamsListComponent implements OnInit {
  constructor(private teamService: TeamService,
    private gameBattleService: GameBattleService
  ) { }

  async ngOnInit(): Promise<void> {
    this.teamService.pokemons$.subscribe(pokemons => {
      this.pokemons = pokemons;
    });

  }


  pokemons: any[] = [];
  @Input() teamId?: any;
  @Input() pokemonId?: any;
  @Input() team?: any;
  @Input() games?: Game[] | null;
  @Input() removePokemon!: (pokemonId: number) => any;



  async callRemovePokemon(pokemonId: number) {
    if (this.removePokemon) {
      await this.removePokemon(pokemonId);
    }
  }

  getPokemonId(pokemonId: number) {
    this.pokemonId = pokemonId;
  }
  
  /*async isPokemonInGameTeam(games: Game) {
    console.log(games)
    try {
      const response = await this.gameBattleService.getPokemonsByTeam(games.player1TeamId);
      const pokemonsAndStats = response.pokemonsAndStats
      const pokemonsInTeam = pokemonsAndStats.some((pokemon: any) => pokemon.id === this.pokemonId)
      console.log(this.pokemonId)
      console.log("pokemonsInTeam", pokemonsInTeam)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }*/

}


