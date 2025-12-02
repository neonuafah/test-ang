import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BookingService } from '../../../services/booking.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessModalComponent } from './success-modal.component';


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatButtonToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class BookingFormComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: string[] = [];

  ngOnInit() {
    this.filteredOptions = this.options.slice();
  }

  filter() {
    const filterValue = this.myControl.value?.toLowerCase() || '';
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  bookingForm = new FormGroup({
    bookingNo: new FormControl(''),
    branch: new FormControl(''),
    customerNo: new FormControl(''),
    customerName: new FormControl(''),
    mawbNo: new FormControl(''),
    hawbNo: new FormControl(''),
    portOfLoading: new FormControl(''),
    destination: new FormControl(''),
    origin: new FormControl(''),
    emptyContainerDate: new FormControl(''),
    emptyContainerTime: new FormControl(''),
    pickupLocation: new FormControl(''),
    pickupDate: new FormControl(''),
    pickupTime: new FormControl(''),
    loadingLocation: new FormControl(''),
    loadingDate: new FormControl(''),
    loadingTime: new FormControl(''),
    carrier: new FormControl(''), // Used for both Carrier and Coload depending on mode
    shipName: new FormControl(''),
    voyFlightNo: new FormControl(''),
    etdDate: new FormControl(''),
    etdTime: new FormControl(''),
    qty: new FormControl(''),
    containerType: new FormControl(''),
    customerInvoice: new FormControl(''),
    cargoQty: new FormControl(''),
    cargoUnit: new FormControl(''),
    totalWeight: new FormControl(''),
    dimensionW: new FormControl(''),
    dimensionL: new FormControl(''),
    dimensionH: new FormControl(''),
    cbm: new FormControl(''),
    truckType: new FormControl(''),
    cargoType: new FormControl(''),
    closingVgmDate: new FormControl(''),
    closingVgmTime: new FormControl(''),
    closingTimeDate: new FormControl(''),
    closingTimeTime: new FormControl(''),
    distance: new FormControl(''),
    containerReturnLocation: new FormControl(''),
    contact: new FormControl(''),
    phoneNumber: new FormControl(''),
    remarks: new FormControl(''),
    billingAddress: new FormControl(''),
    transportCharge: new FormControl(''),
  });

  bookingTypeControl = new FormControl('importFCL'); // ค่าเริ่มต้นคือ FCL

  // Getter เพื่อเช็คสถานะปัจจุบัน
  get isFclMode(): boolean {
    return this.bookingTypeControl.value === 'importFCL';
  }

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    // ถ้าต้องการทำอะไรเมื่อมีการเปลี่ยน Toggle ให้ทำที่นี่
    // this.bookingTypeControl.valueChanges.subscribe(value => { ... });
  }

  onSave() {
    // Map form data to backend format (with all fields)
    const rawData = {
      bookingType: this.bookingTypeControl.value,
      status: 'new',
      bookingNo: this.bookingForm.value.bookingNo,
      branch: this.bookingForm.value.branch,
      customerNo: this.myControl.value,
      customerName: this.bookingForm.value.customerName,
      origin: this.bookingForm.value.origin,
      destination: this.bookingForm.value.destination,
      carrier: this.bookingForm.value.carrier,
      coloadName: this.isFclMode ? undefined : this.bookingForm.value.carrier,
      shipName: this.bookingForm.value.shipName,
      portOfLoading: this.bookingForm.value.portOfLoading,
      voyFlightNo: this.bookingForm.value.voyFlightNo,
      etdDate: this.bookingForm.value.etdDate,
      etdTime: this.bookingForm.value.etdTime,
      qtyContainers: this.bookingForm.value.qty,
      containerType: this.bookingForm.value.containerType,
      customerInvoice: this.bookingForm.value.customerInvoice,
      hawbNo: this.bookingForm.value.hawbNo,
      mawbNo: this.bookingForm.value.mawbNo,
      cargoQty: this.bookingForm.value.cargoQty,
      totalWeight: this.bookingForm.value.totalWeight,
      dimensionWidth: this.bookingForm.value.dimensionW,
      dimensionHeight: this.bookingForm.value.dimensionH,
      dimensionLength: this.bookingForm.value.dimensionL,
      cbm: this.bookingForm.value.cbm,
      truckType: this.bookingForm.value.truckType,
      cargoType: this.bookingForm.value.cargoType,
      containerReturnLoc: this.bookingForm.value.containerReturnLocation,
      distance: this.bookingForm.value.distance,
      contact: this.bookingForm.value.contact,
      phone: this.bookingForm.value.phoneNumber,
      remarks: this.bookingForm.value.remarks,
      billingAddress: this.bookingForm.value.billingAddress,
      transportCharge: this.bookingForm.value.transportCharge,
      attachments: []
    };

    // Filter out empty, null, and undefined values
    const bookingData: any = {};
    Object.keys(rawData).forEach(key => {
      const value = (rawData as any)[key];
      // Only include if value is not empty, null, or undefined
      if (value !== '' && value !== null && value !== undefined) {
        bookingData[key] = value;
      }
    });

    // Send data via socket.io
    this.bookingService.createBooking(bookingData).subscribe({
      next: (response) => {
        // Open success modal
        this.dialog.open(SuccessModalComponent, {
          width: '400px',
          disableClose: true,
          panelClass: 'success-modal-dialog'
        });
      },
      error: (error) => {
        console.error('Error saving booking:', error);
        this.snackBar.open('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'ปิด', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}