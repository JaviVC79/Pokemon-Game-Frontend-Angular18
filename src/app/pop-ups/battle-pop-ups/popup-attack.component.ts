import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'popup-attack',
  template: `
<ng-container>
  <div class="flex flex-col items-center justify-end min-h-10 relative bg-slate-200">
    <div mat-dialog-content>
      <p class="mt-8">{{data.popupMessage}}</p>
    </div>
    <button mat-button mat-dialog-close class="absolute top-0 left-4 bg-red-300 hover:bg-red-400 px-2 py-0.5" (click)="close()">X</button>
  </div>
</ng-container>
  `,
})
export class PopupAttackDefenseComponent {
  constructor(
    private dialogRef: MatDialogRef<PopupAttackDefenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { popupMessage: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
