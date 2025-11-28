import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-return-container',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="page-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Return Container</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Manage container returns.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 24px;
    }
    mat-card-title {
      color: #5c6bc0;
    }
  `]
})
export class ReturnContainerComponent { }
