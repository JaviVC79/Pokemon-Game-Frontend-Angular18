import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-abilities-pokemon',
  standalone: true,
  imports: [NgFor],
  templateUrl: './abilities-pokemon.component.html',
  styleUrl: './abilities-pokemon.component.css'
})
export class AbilitiesPokemonComponent {
  @Input() pokemon: any | null = null;
}
