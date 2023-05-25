import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    const maxHeroId = Math.max(...this.heroes.map((hero) => hero.id));
    const newHero = {
      id: maxHeroId + 1,
      name,
    };
    this.heroService.addHero(newHero).subscribe((hero) => this.heroes.push(hero));
  }

  deleteHero(heroId: number): void {
    console.log('clicked delete');
    this.heroService.deleteHero(heroId).subscribe(() => this.getHeroes());
  }
}
