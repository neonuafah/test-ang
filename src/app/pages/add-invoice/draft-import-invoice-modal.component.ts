import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface DraftInvoiceData {
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
    selector: 'app-draft-import-invoice-modal',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    templateUrl: './draft-import-invoice-modal.component.html',
    styleUrl: './draft-import-invoice-modal.component.scss'
})
export class DraftImportInvoiceModalComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    displayedColumns: string[] = [
        'bookingNo',
        'customerInvoice',
        'w',
        'l',
        'h',
        'cbm',
        'hawbNo',
        'weight',
        'cargoQty',
        'cargoUnit',
        'price',
        'priceUnit'
    ];

    invoiceForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<DraftImportInvoiceModalComponent>,
        private fb: FormBuilder
    ) {
        this.invoiceForm = this.fb.group({
            invoices: this.fb.array([])
        });
    }

    ngOnInit(): void {
        // Initialize with sample data
        this.loadSampleData();
    }

    get invoices(): FormArray {
        return this.invoiceForm.get('invoices') as FormArray;
    }

    loadSampleData(): void {
        const sampleData: DraftInvoiceData[] = [
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
            },
            {
                bookingNo: 'BK002',
                customerInvoice: 'INV002',
                w: 120,
                l: 180,
                h: 140,
                cbm: 3.024,
                hawbNo: 'HAWB002',
                weight: 450,
                cargoQty: 8,
                cargoUnit: 'PCS',
                price: 4500,
                priceUnit: 'THB'
            }
        ];

        sampleData.forEach(data => this.addInvoiceRow(data));
    }

    addInvoiceRow(data: DraftInvoiceData): void {
        const invoiceGroup = this.fb.group({
            bookingNo: [data.bookingNo],
            customerInvoice: [data.customerInvoice],
            w: [data.w],
            l: [data.l],
            h: [data.h],
            cbm: [data.cbm],
            hawbNo: [data.hawbNo],
            weight: [data.weight],
            cargoQty: [data.cargoQty],
            cargoUnit: [data.cargoUnit],
            price: [data.price],
            priceUnit: [data.priceUnit]
        });
        this.invoices.push(invoiceGroup);
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        // Get the edited data from the form
        const editedData = this.invoices.value;
        this.dialogRef.close(editedData);
    }

    onAddFile(): void {
        // Trigger file input click
        this.fileInput.nativeElement.click();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            // TODO: Implement file parsing logic here
            // For now, just add a sample row when file is selected
            this.addInvoiceRow({
                bookingNo: 'BK003',
                customerInvoice: 'INV003',
                w: 110,
                l: 190,
                h: 145,
                cbm: 3.0,
                hawbNo: 'HAWB003',
                weight: 480,
                cargoQty: 9,
                cargoUnit: 'PCS',
                price: 4800,
                priceUnit: 'THB'
            });
        }
    }
}
