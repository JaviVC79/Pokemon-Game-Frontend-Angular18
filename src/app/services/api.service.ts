import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../prueba/prueba.component';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable({
    providedIn: 'root',
})
export class PokemonService {

    constructor(private http: HttpClient) { }

    async fetchData(offset?: number, limit?: number) {
        if (offset === undefined) {
            offset = 0;
            localStorage.setItem('offset', offset.toString());
        }

        if (limit === undefined) {
            limit = 99;
            localStorage.setItem('limit', limit.toString());
        }
        localStorage.setItem('offset', offset.toString());
        localStorage.setItem('limit', limit.toString());
        offset = Number(localStorage.getItem('offset'));
        limit = Number(localStorage.getItem('limit'));
        const results = await lastValueFrom(this.http.get<Data>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`));
        if (!results) {

            return null;
        }
        return results.results;
    }

    async fetchPokemonImage(urls: any[]) {
        const pokemons: string[] = [];
        let validatedPokemons: string[] = [];
        if (!urls || urls.length === 0) {
            return null;
        }
        //console.log('url', urls)
        try {
            await Promise.all(urls.map(async (url) => {
                const response = await lastValueFrom(this.http.get<any>(url.url));
                pokemons.push(response)//.sprites.other.home.front_shiny);
                validatedPokemons = pokemons.filter((element:any) => element != null)
            }))
            //console.log('pokemons', validatedPokemons)
            return validatedPokemons;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async getPokemons(offset?: number, limit?: number) {
        const urls = await this.fetchData(offset, limit);
        if (!urls) {
            return null;
        }
        const pokemons = await this.fetchPokemonImage(urls);
        //console.log(pokemons)
        return pokemons;
    }
    async getPokemonsAttackstats(url: string) {
        const attacks = await lastValueFrom(this.http.get<any>(url));;
        if (!attacks) {
            return null;
        }
        //console.log(attacks)
        return attacks.affecting_moves;
    }
    async getPokemon(clicked_id: number) {
        const results = await lastValueFrom(this.http.get<Data>(`https://pokeapi.co/api/v2/pokemon/${clicked_id}`));
        if (!results) {
            return null;
        }
        //console.log(results)
        return results;
        //return results.results;
    }

    async getAttacksEffects(attackUrl: string) {
        const results = await lastValueFrom(this.http.get<Data>(attackUrl))
        if (!results) {
            return null;
        }
        //console.log(results);
        return results;
      }

}

