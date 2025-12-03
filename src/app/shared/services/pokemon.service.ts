import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, of, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { PokemonListResponse } from '../models/pokemon-api.model';
import { PokemonItem } from '../models/pokemon-item.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly http = inject(HttpClient);

  private readonly apiBase = 'https://pokeapi.co/api/v2';
  private readonly imageBase =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

  private readonly pageCache = new Map<string, PokemonItem[]>();

  getPokemonPage2(limit = 8, offset = 0): Observable<PokemonItem[]> {
    const url = `${this.apiBase}/pokemon?limit=${limit}&offset=${offset}`;

    return this.http.get<PokemonListResponse>(url).pipe(
      map((response) =>
        response.results.map((item) => {
          const id = this.getIdFromTheUrl(item.url);
          const entry: PokemonItem = {
            id,
            name: this.capitalize(item.name),
            displayId: `#${id.toString().padStart(3, '0')}`,
            imageUrl: `${this.imageBase}/${id}.png`,
          };
          return entry;
        })
      ),
      catchError((error) => {
        return throwError(() => new Error('Failed to load pokemons'));
      })
    );
  }

  getPokemonPage(limit = 8, offset = 0): Observable<PokemonItem[]> {
    const cacheKey = `${limit}:${offset}`;

    const cached = this.pageCache.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const url = `${this.apiBase}/pokemon?limit=${limit}&offset=${offset}`;

    return this.http.get<PokemonListResponse>(url).pipe(
      map((response) =>
        response.results.map((item) => {
          const id = this.getIdFromTheUrl(item.url);
          return {
            id,
            name: this.capitalize(item.name),
            displayId: `#${id.toString().padStart(3, '0')}`,
            imageUrl: `${this.imageBase}/${id}.png`,
          } as PokemonItem;
        })
      ),
      tap((entries: any) => {
        this.pageCache.set(cacheKey, entries);
      }),
      catchError((error: any) => {
      return throwError(() => new Error(error + 'Failed to load pokemons'));
      })
    );
  }

  private getIdFromTheUrl(url: string): number {
    const filterUrl = url.split('/').filter(Boolean);
    const id = filterUrl[filterUrl.length - 1];
    return Number(id);
  }

  private capitalize(value: string): string {
    return value.length ? value[0].toUpperCase() + value.slice(1) : value;
  }

}
