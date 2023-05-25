import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = '/api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient, private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }

  log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHero(id: number): Observable<Hero> {
    return this.httpClient
      .get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(tap(() => this.log(`fetched hero id=${id}`), catchError(this.handleError<Hero>('getHero'))));
  }

  updateHero(hero: Hero): Observable<Hero> {
    const response = this.httpClient
      .post<Hero>(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions)
      .pipe(tap(() => this.log(`updated hero id=${hero.id}`), catchError(this.handleError<Hero>('updateHero'))));
    return response;
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient
      .post<Hero>(`${this.heroesUrl}/${hero.id}`, hero)
      .pipe(tap(() => this.log(`added hero with id=${hero.id}`), catchError(this.handleError<Hero>('addHero'))));
  }

  deleteHero(heroId: number): Observable<any> {
    return this.httpClient
      .delete<Hero>(`${this.heroesUrl}/${heroId}`)
      .pipe(tap(() => this.log(`deleted hero with id=${heroId}`), catchError(this.handleError<Hero>('addHero'))));
  }
}
