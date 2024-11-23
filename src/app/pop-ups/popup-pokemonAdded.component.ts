import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    standalone: true,
    selector: 'popup-pokemon-added',
    template: `
<ng-container>
  <div class="flex flex-col items-center justify-end min-h-10 relative bg-slate-200">
    <div mat-dialog-content>
      <p>Pokemon added successfully.</p>
    </div>
    <button mat-button mat-dialog-close class="absolute top-0 left-4 bg-red-300 hover:bg-red-400 px-2 py-0.5" (click)="close()">X</button>
  </div>
</ng-container>

  `,
})
export class PopupPokemonAddedComponent {
    constructor(private dialogRef: MatDialogRef<PopupPokemonAddedComponent>) { }
    close() {
        this.dialogRef.close();
    }
}