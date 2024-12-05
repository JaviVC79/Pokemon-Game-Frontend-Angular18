import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-pokemon',
  standalone: true,
  imports: [NgFor],
  templateUrl: './stats-pokemon.component.html',
})
export class StatsPokemonComponent {
  @Input() pokemon: any | null = null;
}
