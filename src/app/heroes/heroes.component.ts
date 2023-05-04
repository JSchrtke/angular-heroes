import { Component } from "@angular/core";
import { HEROES } from "../hero";

@Component({
    selector: "app-heroes",
    templateUrl: "./heroes.component.html",
    styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent {
    heroes = HEROES;
}
