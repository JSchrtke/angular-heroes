import { HttpClient } from '@angular/common/http';
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
  constructor(private httpClient: HttpClient, private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.messageService.add(`HeroService: ${operation} failed: ${error}`);
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    return this.httpClient
      .get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap((_) => this.messageService.add(`fetched hero id=${id}`), catchError(this.handleError<Hero>('getHero')))
      );
  }
}
