import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonObject } from '../utils/types/pokemonType';
import { GameService } from '../prueba/prueba.logicGame.service';

@Component({
  selector: 'createPlayerForm',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-player-form.component.html',
  //styleUrl: './app.component.css'
})
export class createPlayerFormComponent {

  constructor(private http: HttpClient, private gameService: GameService) { }

  title = 'createPlayerForm';
  email: string = '';
  nickName: string = '';
  password: string = '';
  users: any[] = [];

  async onSubmit() {

    const newPlayer = {
      email: this.email,
      nickName: this.nickName,
      password: this.password,
    };
    console.log(newPlayer);
    this.users.push(newPlayer);
    console.log(this.users);
    this.singUp(newPlayer);

  }

  async singUp(newPlayer: any) {
    const body = newPlayer;
    try{
      const response = await lastValueFrom(this.http.post<any>(`https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/pokemon-api`, body, { withCredentials: true }));
      if (!response) return null;
      console.log(response);
      return response;

    }catch(error){
      return error
    }
  }


  async traerDatos() {
    try {
      const token = localStorage.getItem('pokemon_jwt')
      const response = await lastValueFrom(this.http.get<Array<PokemonObject>>(`https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/pokemon-api`, { withCredentials: true, headers: { 'Authorization': `Bearer ${token}` } }));
      if (!response) return null;
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async enviarDatos(pokemon: any) {
    this.gameService.getPokemon(pokemon)
    /*const body = [{
      "name": "Dragonite",
      "types": "Dragon, Flying",
      "abilities": "Inner Focus",
      "moves": "Dragon Tail, Thunder Punch, Fire Punch, Hyper Bean"
    },
    {
      "hp": 300,
      "attack": 134,
      "specialAttack": 100,
      "defense": 95,
      "specialDefense": 100,
      "speed": 80
    }
    ];
    console.log(body)
    try {
      const response = await lastValueFrom(this.http.post<Array<any>>(`https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/pokemon-api/pokemon/32`, body, { withCredentials: true }));
      if (!response) return null;
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }*/
  }
  /*async ngOnInit() {
    this.users = await this.prisma.user.findMany();
  }*/


}