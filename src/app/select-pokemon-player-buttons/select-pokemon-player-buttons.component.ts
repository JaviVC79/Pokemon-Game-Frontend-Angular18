import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GameService } from '../prueba/prueba.logicGame.service';
import { TeamService } from '../services/team.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-select-pokemon-player-buttons',
  standalone: true,
  imports: [MatIcon, NgIf],
  templateUrl: './select-pokemon-player-buttons.component.html',
  styleUrl: './select-pokemon-player-buttons.component.css'
})
export class SelectPokemonPlayerComponent implements OnInit {
  team!: any;
  @Input() pokemon: any;
  isLogin: boolean | null = null;

  constructor(private gameService: GameService, private teamService: TeamService, private authService: AuthService) { }

  ngOnInit() {
    this.teamService.teamId$.subscribe(team => {
      this.team = team;
    });
    this.authService.loggedIn$.subscribe((status) => {
      this.isLogin = status;
    });
  }
  ngDoCheck() {
    this.isLogin = this.authService.isLogin();
  }


  async addPokemon(pokemon: any) {
    const selectedPokemon = await this.gameService.getPokemon(pokemon);
    await this.gameService.createNewPokemon(selectedPokemon, this.team.id);
  }
}

