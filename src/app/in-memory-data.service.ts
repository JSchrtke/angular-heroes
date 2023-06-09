import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombastos' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magenta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
      { id: 420, name: 'Galactus' },
    ];
    return { heroes };
  }
}
