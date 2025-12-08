import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FixCostModalComponent, FixCostData } from './fix-cost-modal/fix-cost-modal.component';

@Component({
  selector: 'app-add-fix-cost',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-fix-cost.html',
  styleUrl: './add-fix-cost.scss',
})
export class AddFixCost {
  displayedColumns: string[] = [
    'details',
    'calculationStartDate',
    'price',
    'startDate',
    'endDate',
    'document',
    'actions'
  ];

  fixCosts: FixCostData[] = [
    {
      type: 'ค่าผ่อนรถ',
      calculationStartDate: new Date('2024-01-01'),
      price: 15000,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      document: null,
      documentName: ''
    },
    {
      type: 'ค่าประกันภัย',
      calculationStartDate: new Date('2024-02-15'),
      price: 25000.50,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2025-02-14'),
      document: null,
      documentName: 'insurance_policy.pdf'
    },
    {
      type: 'ค่าภาษี',
      calculationStartDate: new Date('2024-03-10'),
      price: 3500,
      startDate: new Date('2024-03-10'),
      endDate: new Date('2025-03-09'),
      document: null,
      documentName: ''
    }
  ];

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  openAddModal(): void {
    const dialogRef = this.dialog.open(FixCostModalComponent, {
      width: '400px',
      panelClass: 'fix-cost-modal-panel'
    });

    dialogRef.afterClosed().subscribe((result: FixCostData) => {
      if (result) {
        this.ngZone.run(() => {
          this.fixCosts = [...this.fixCosts, result];
          this.cdr.markForCheck();
        });
      }
    });
  }

  deleteRow(index: number): void {
    this.fixCosts = this.fixCosts.filter((_, i) => i !== index);
    this.cdr.markForCheck();
  }
}

