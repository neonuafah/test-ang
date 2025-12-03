import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DraftImportInvoiceModalComponent } from './draft-import-invoice-modal.component';

export interface InvoiceData {
  bookingNo: string;
  customerInvoice: string;
  w: number;
  l: number;
  h: number;
  cbm: number;
  hawbNo: string;
  weight: number;
  cargoQty: number;
  cargoUnit: string;
  price: number;
  priceUnit: string;
}

@Component({
  selector: 'app-add-invoice',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './add-invoice.html',
  styleUrl: './add-invoice.scss',
})
export class AddInvoice {
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['bookingNo', 'customerInvoice', 'w', 'l', 'h', 'cbm', 'hawbNo', 'weight', 'cargoQty', 'cargoUnit', 'price', 'priceUnit'];

  dataSource: InvoiceData[] = [
    // Sample data - replace with actual data
    {
      bookingNo: 'BK001',
      customerInvoice: 'INV001',
      w: 100,
      l: 200,
      h: 150,
      cbm: 3.0,
      hawbNo: 'HAWB001',
      weight: 500,
      cargoQty: 10,
      cargoUnit: 'PCS',
      price: 5000,
      priceUnit: 'THB'
    }
  ];

  openImportModal(): void {
    const dialogRef = this.dialog.open(DraftImportInvoiceModalComponent, {
      width: '90vw',
      maxWidth: '1200px',
      maxHeight: '90vh',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle imported data - add to table
        console.log('Imported data:', result);
        this.dataSource = [...this.dataSource, ...result];
      }
    });
  }

  addNewInvoice(): void {
    // Add new empty invoice row to table
    const newInvoice: InvoiceData = {
      bookingNo: '',
      customerInvoice: '',
      w: 0,
      l: 0,
      h: 0,
      cbm: 0,
      hawbNo: '',
      weight: 0,
      cargoQty: 0,
      cargoUnit: '',
      price: 0,
      priceUnit: ''
    };
    this.dataSource = [...this.dataSource, newInvoice];
  }
}
