export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export type StatsDto = {
    hp: number;
    attack: number;
    specialAttack: number;
    defense: number;
    specialDefense: number;
    speed: number;
}

export type PokemonDto = {
    id: number;
    name: string;
    statsId: number;
    types: string;
    abilities: string;
    moves: string;
    teamId: number;
    imageURL:string;
}