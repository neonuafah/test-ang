import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dispatch-center',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="page-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Dispatch Center</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Dispatch operations control panel.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 24px;
    }
    mat-card-title {
      color: #1976d2;
    }
  `]
})
export class DispatchCenterComponent { }
