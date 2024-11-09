export type Stats = {
    id: number;
    hp: number;
    attack: number;
    specialAttack: number;
    defense: number;
    specialDefense: number;
    speed: number;
  };
  
  export type Pokemon = {
    id: number;
    name: string;
    statsId: number;
    types: string;
    abilities: string;
    moves: string;
    teamId: number;
    stats: Stats;
  };
  
  export type Team = {
    id: number;
    name: string;
    playerId: number;
    pokemons: Pokemon[];
  };
  
  export type Player = {
    id: number;
    email: string;
    nickName: string;
    password: string;
    wins: number;
    losses: number;
    draws: number;
    teams: Team[];
  };
  
  export type PokemonObject = {
    player: Player[];
  };
  
  export interface TeamResponse {
    user_id: string;
    id: number;
    name: string;
    playerId: number;
  }
  
  export interface TeamsResponse {
    teams: TeamResponse[];
    status: number;
    message: string;
  }