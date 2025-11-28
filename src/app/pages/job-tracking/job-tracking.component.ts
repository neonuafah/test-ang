import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-job-tracking',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="page-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Job Tracking</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Track active jobs in real-time.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 24px;
    }
    mat-card-title {
      color: #039be5;
    }
  `]
})
export class JobTrackingComponent { }
