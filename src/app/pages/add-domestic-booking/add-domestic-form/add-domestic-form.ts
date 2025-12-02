import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-domestic-form',
  imports: [CommonModule,
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
    MatAutocompleteModule],
  templateUrl: './add-domestic-form.html',
  styleUrl: './add-domestic-form.scss',
})
export class AddDomesticForm implements OnInit {
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
    deliveryDate: new FormControl(''),
    deliveryTime: new FormControl(''),
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

  bookingTypeControl = new FormControl('FCL'); // ค่าเริ่มต้นคือ FCL

  // Getter เพื่อเช็คสถานะปัจจุบัน
  get isFclMode(): boolean {
    return this.bookingTypeControl.value === 'FCL';
  }

  constructor() {
    // ถ้าต้องการทำอะไรเมื่อมีการเปลี่ยน Toggle ให้ทำที่นี่
    // this.bookingTypeControl.valueChanges.subscribe(value => { ... });
  }
}
