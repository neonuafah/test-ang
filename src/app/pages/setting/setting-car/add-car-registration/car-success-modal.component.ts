import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-car-success-modal',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatIconModule],
    template: `
    <div class="success-modal">
      <div class="modal-content">
        <div class="icon-container">
          <mat-icon class="success-icon">check_circle</mat-icon>
        </div>
        <h2 mat-dialog-title>บันทึกข้อมูลสำเร็จ!</h2>
        <mat-dialog-content>
          <p>ข้อมูลทะเบียนรถถูกบันทึกเรียบร้อยแล้ว</p>
        </mat-dialog-content>
        <mat-dialog-actions align="center">
          <button mat-flat-button color="primary" (click)="goToSettingCar()" class="action-button">
            กลับไปหน้า ทะเบียนรถ
          </button>
        </mat-dialog-actions>
      </div>
    </div>
  `,
    styles: [`
    .success-modal {
      padding: 20px;
      text-align: center;
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .success-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #4caf50;
      animation: scaleIn 0.3s ease-in-out;
    }

    @keyframes scaleIn {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
      color: #333;
    }

    mat-dialog-content {
      padding: 0;
    }

    mat-dialog-content p {
      margin: 0;
      font-size: 16px;
      color: #666;
    }

    mat-dialog-actions {
      padding: 0;
      margin-top: 10px;
    }

    .action-button {
      min-width: 200px;
      padding: 10px 30px;
      font-size: 16px;
    }
  `]
})
export class CarSuccessModalComponent {
    constructor(
        public dialogRef: MatDialogRef<CarSuccessModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) { }

    goToSettingCar(): void {
        this.dialogRef.close();
        this.router.navigate(['/setting/car']);
    }
}
