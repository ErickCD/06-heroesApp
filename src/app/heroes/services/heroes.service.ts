import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private baseURL: string = enviroments.baseURL;

  constructor(private httpClient: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseURL}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpClient
      .get<Hero>(`${this.baseURL}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(
      `${this.baseURL}/heroes?q=${query}&_limit=6`
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseURL}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) {
      throw Error('The hero must have an id');
    }

    return this.httpClient.patch<Hero>(
      `${this.baseURL}/heroes${hero.id}`,
      hero
    );
  }

  deleteHeroById(id: string): Observable<boolean> {
    if (!id) {
      throw Error('The id is required');
    }

    return this.httpClient.delete(`${this.baseURL}/heroes${id}`).pipe(
      catchError((error) => of(false)), // Si da error, entonces es false
      map((resp) => true) // Si llega al map, entonces todo ok.
    );
  }
}
