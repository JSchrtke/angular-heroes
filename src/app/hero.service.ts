import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Hero, HEROES } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    console.log('before');
    const heroes = of(HEROES).pipe(delay(1000));
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
