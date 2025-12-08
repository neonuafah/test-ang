import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface FixCostData {
    type: string;
    calculationStartDate: Date | null;
    price: number | null;
    startDate: Date | null;
    endDate: Date | null;
    document: File | null;
    documentName: string;
}

@Component({
    selector: 'app-fix-cost-modal',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule
    ],
    templateUrl: './fix-cost-modal.component.html',
    styleUrl: './fix-cost-modal.component.scss'
})
export class FixCostModalComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    fixCostForm!: FormGroup;
    selectedFileName: string = '';

    costTypes: string[] = [
        'ค่าผ่อนรถ',
        'ค่าประกันภัย',
        'ค่า พรบ.',
        'ค่าภาษี',
        'อื่นๆ'
    ];

    constructor(
        public dialogRef: MatDialogRef<FixCostModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.fixCostForm = this.fb.group({
            type: ['', Validators.required],
            calculationStartDate: [null, Validators.required],
            price: [null, Validators.required],
            startDate: [null, Validators.required],
            endDate: [null, Validators.required],
            document: [null],
            documentName: ['']
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.fixCostForm.valid) {
            const formData: FixCostData = {
                type: this.fixCostForm.get('type')?.value,
                calculationStartDate: this.fixCostForm.get('calculationStartDate')?.value,
                price: this.fixCostForm.get('price')?.value,
                startDate: this.fixCostForm.get('startDate')?.value,
                endDate: this.fixCostForm.get('endDate')?.value,
                document: this.fixCostForm.get('document')?.value,
                documentName: this.selectedFileName
            };
            this.dialogRef.close(formData);
        }
    }

    onChooseFile(): void {
        this.fileInput.nativeElement.click();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.selectedFileName = file.name;
            this.fixCostForm.patchValue({ document: file, documentName: file.name });
        }
    }

    clearFile(): void {
        this.selectedFileName = '';
        this.fixCostForm.patchValue({ document: null, documentName: '' });
        this.fileInput.nativeElement.value = '';
    }

    addNewType(): void {
        // Placeholder for adding new type functionality
    }
}
