import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-job-queue',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="page-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Job Queue</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>View and manage job queues.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 24px;
    }
    mat-card-title {
      color: #00897b;
    }
  `]
})
export class JobQueueComponent { }
