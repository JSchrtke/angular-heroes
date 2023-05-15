import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Hero, HEROES } from './hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    console.log('before');
    const heroes = of(HEROES).pipe(delay(1000));
    return heroes;
  }
}
