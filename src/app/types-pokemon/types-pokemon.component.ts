import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-types-pokemon',
  standalone: true,
  imports: [NgFor],
  templateUrl: './types-pokemon.component.html',
  styleUrl: './types-pokemon.component.css'
})
export class TypesPokemonComponent {
  @Input() pokemon: any | null = null;
}
