import { Component, signal, effect, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { BookingService } from '../../../services/booking.service';

interface BookingFormData {
  bookingType: 'FCL' | 'LCL';
  bookingNo: string;
  branch: string;
  customerNo: string;
  customerName: string;
  mawbNo: string;
  hawbNo: string;
  portOfLoading: string;
  destination: string;
  origin: string;
  pickupDate: Date;
  pickupTime: string;
  loadingLocation: string;
  loadingDate: Date;
  loadingTime: string;
  carrier?: string;
  shipName?: string;
  coloadName?: string;
  voyFlightNo: string;
  etdDate: Date;
  etdTime: string;
  customerInvoice: string;
  qtyContainers?: number;
  containerType?: string;
  cargoQty: number;
  cargoUnit: string;
  totalWeight: number;
  dimensionWidth?: number;
  dimensionLength?: number;
  dimensionHeight?: number;
  cbm: number;
  truckType: string;
  cargoType: string;
  closingVgmDate?: Date;
  closingVgmTime?: string;
  closingTimeDate?: Date;
  closingTimeTime?: string;
  containerReturnLoc?: string;
  distance: number;
  contact: string;
  phone: string;
  remarks: string;
  billingAddress: string;
  transportCharge: number;
  attachments: string[];
}

@Component({
  selector: 'app-booking-form',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' }
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTooltipModule,
    MatTabsModule,
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class BookingFormComponent implements OnInit {
  // ========== SIGNALS ==========
  bookingType = signal<'FCL' | 'LCL'>('FCL');
  files = signal<string[]>([]);
  isSubmitting = signal(false);
  uploadProgress = signal(0);

  // ========== FORM BUILDER ==========
  bookingForm: FormGroup;
  formBuilder = new FormBuilder();

  // ========== CONSTRUCTOR ==========
  constructor(
    private cdr: ChangeDetectorRef,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.initializeForm();

    // Update validators based on booking type (using effect for signals)
    // effect() must be called in injection context (constructor)
    effect(() => {
      const type = this.bookingType();
      this.updateValidatorsForBookingType(type);
      this.cdr.markForCheck();
    });
  }

  // ========== INITIALIZE FORM ==========
  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      // Booking Info
      status: ['new'],
      bookingNo: [''],
      branch: ['', Validators.required],
      customerNo: ['', Validators.required],
      customerName: [{ value: '', disabled: true }],
      mawbNo: [''],
      hawbNo: [''],
      portOfLoading: ['', Validators.required],
      destination: ['', Validators.required],
      origin: ['', Validators.required],
      pickupDate: [''],
      pickupTime: [''],
      loadingLocation: [''],
      loadingDate: [''],
      loadingTime: [''],

      // Carrier/Ship Info
      carrier: [''],
      shipName: [''],
      coloadName: [''],
      voyFlightNo: [''],
      etdDate: [''],
      etdTime: [''],
      customerInvoice: [''],

      // FCL Specific
      qtyContainers: [''],
      containerType: [''],

      // Cargo Information
      cargoQty: ['', Validators.required],
      cargoUnit: ['pcs', Validators.required],
      totalWeight: ['', Validators.required],
      dimensionWidth: [''],
      dimensionLength: [''],
      dimensionHeight: [''],
      cbm: ['', Validators.required],

      // Transport Details
      truckType: ['4w', Validators.required],
      cargoType: ['gen', Validators.required],
      closingVgmDate: [''],
      closingVgmTime: [''],
      closingTimeDate: [''],
      closingTimeTime: [''],
      containerReturnLoc: [''],
      distance: [''],

      // Contact Information
      contact: [''],
      phone: [''],
      remarks: [''],

      // Billing
      billingAddress: [''],
      transportCharge: ['0'],
    });
  }

  // ========== LIFECYCLE HOOKS ==========
  ngOnInit(): void {
    this.setupFormSubscriptions();
    // Trigger change detection to ensure Material components render properly
    this.cdr.detectChanges();
  }

  // ========== FORM SUBSCRIPTIONS ==========
  private setupFormSubscriptions(): void {
    // Auto-fill customer name based on customer selection
    this.bookingForm.get('customerNo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.bookingForm.get('customerName')?.setValue(`Customer ${value}`);
        this.cdr.markForCheck();
      }
    });
  }

  // ========== UPDATE VALIDATORS ==========
  private updateValidatorsForBookingType(type: 'FCL' | 'LCL'): void {
    const carrierControl = this.bookingForm.get('carrier');
    const shipNameControl = this.bookingForm.get('shipName');
    const coloadControl = this.bookingForm.get('coloadName');
    const qtyControl = this.bookingForm.get('qtyContainers');
    const containerTypeControl = this.bookingForm.get('containerType');

    if (type === 'FCL') {
      carrierControl?.setValidators([Validators.required]);
      shipNameControl?.setValidators([Validators.required]);
      coloadControl?.clearValidators();
      qtyControl?.setValidators([Validators.required, Validators.min(1)]);
      containerTypeControl?.setValidators([Validators.required]);
    } else {
      carrierControl?.clearValidators();
      shipNameControl?.clearValidators();
      coloadControl?.setValidators([Validators.required]);
      qtyControl?.clearValidators();
      containerTypeControl?.clearValidators();
    }

    carrierControl?.updateValueAndValidity();
    shipNameControl?.updateValueAndValidity();
    coloadControl?.updateValueAndValidity();
    qtyControl?.updateValueAndValidity();
    containerTypeControl?.updateValueAndValidity();
  }

  // ========== HANDLE BOOKING TYPE CHANGE ==========
  onBookingTypeChange(event: MatButtonToggleChange): void {
    this.bookingType.set(event.value);
  }

  // ========== FILE HANDLING ==========
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files).map((f) => f.name);
      this.files.update((existing) => [...existing, ...newFiles]);
      input.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      const newFiles = Array.from(event.dataTransfer.files).map((f) => f.name);
      this.files.update((existing) => [...existing, ...newFiles]);
    }
  }

  removeFile(index: number): void {
    this.files.update((existing) => existing.filter((_, i) => i !== index));
  }

  // ========== FORM SUBMISSION ==========
  onSave(): void {
    if (this.bookingForm.valid) {
      this.isSubmitting.set(true);

      // Collect form data
      const formData = this.collectFormData();
      console.log('Booking Data:', formData);

      this.bookingService.createBooking(formData).subscribe({
        next: (response) => {
          console.log('Booking saved:', response);
          this.isSubmitting.set(false);
          alert('Booking saved successfully!');
          // this.router.navigate(['/booking']);
        },
        error: (error) => {
          console.error('Error saving booking:', error);
          this.isSubmitting.set(false);
          alert('Error saving booking. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched(this.bookingForm);
    }
  }

  // ========== COLLECT FORM DATA ==========
  private collectFormData(): BookingFormData {
    return {
      bookingType: this.bookingType(),
      ...this.bookingForm.getRawValue(),
      attachments: this.files(),
    };
  }

  // ========== MARK ALL FIELDS AS TOUCHED ==========
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // ========== FORM STATE CHECKS ==========
  get isFormValid(): boolean {
    return this.bookingForm.valid;
  }

  get hasErrors(): boolean {
    return this.bookingForm.invalid && this.bookingForm.touched;
  }

  get isFCL(): boolean {
    return this.bookingType() === 'FCL';
  }

  get isLCL(): boolean {
    return this.bookingType() === 'LCL';
  }

  // ========== RESET FORM ==========
  onCancel(): void {
    if (confirm('คุณแน่ใจว่าต้องการยกเลิก? ข้อมูลที่ยังไม่บันทึกจะสูญหาย')) {
      this.bookingForm.reset();
      this.files.set([]);
    }
  }
}