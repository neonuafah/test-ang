import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookingTable } from './booking-table/booking-table';
import { InputSearch } from './input-search/input-search';
import { AddBooking } from './add-booking/add-booking';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, BookingTable, InputSearch, AddBooking],
  templateUrl: './booking.html',
  styleUrls: ['./booking.scss']
})
export class BookingComponent {
  displayedColumns: string[] = ['status', 'branch', 'bookingNumber', 'job', 'type', 'customer', 'cusInventory', 'cusBL', 'origin', 'destination', 'returnDate', 'returnLocation', 'containerNumber', 'coload', 'boatName', 'eatDate', 'boatContainerNumber', 'createdAt'];
  data = [
    {
      id: 1,
      status: 'Approve',
      branch: 'HQ',
      bookingNumber: 'B2508-0001',
      job: 'IM',
      type: 'FCL',
      customer: 'บริษัท โกลเวีย จำกัด',
      cusInventory: '205-7501 8300',
      cusBL: '.......',
      origin: 'Airport BKK',
      destination: 'S/P-บางนา กม.22',
      returnDate: '2025-08-19',
      returnLocation: '-',
      containerNumber: '-',
      coload: '-',
      boatName: '-',
      eatDate: '-',
      boatContainerNumber: '-',
      createdAt: '-',
    },
    {
      id: 2,
      status: 'New',
      branch: 'HQ',
      bookingNumber: 'B2508-0002',
      job: 'EX',
      type: 'FCL',
      customer: 'บริษัท โกลเวีย จำกัด',
      cusInventory: '205-7501 2578',
      cusBL: '.......',
      origin: 'Airport BKK',
      destination: 'S/P-บางนา กม.22',
      returnDate: '2025-08-19',
      returnLocation: '-',
      containerNumber: '-',
      coload: '-',
      boatName: '-',
      eatDate: '-',
      boatContainerNumber: '-',
      createdAt: '-',
    },
    {
      id: 3,
      status: 'Approve',
      branch: 'HQ',
      bookingNumber: 'B2508-0003',
      job: 'EX',
      type: 'FCL',
      customer: 'บริษัท โกลเวีย จำกัด',
      cusInventory: '205-5474 5678',
      cusBL: '.......',
      origin: 'Airport BKK',
      destination: 'S/P-บางนา กม.22',
      returnDate: '2025-08-19',
      returnLocation: '-',
      containerNumber: '-',
      coload: '-',
      boatName: '-',
      eatDate: '-',
      boatContainerNumber: '-',
      createdAt: '-',
    },
    {
      id: 4,
      status: 'New',
      branch: 'HQ',
      bookingNumber: 'B2508-0004',
      job: 'IM',
      type: 'FCL',
      customer: 'บริษัท โกลเวีย จำกัด',
      cusInventory: '205-7751 5684',
      cusBL: '.......',
      origin: 'Airport BKK',
      destination: 'S/P-บางนา กม.22',
      returnDate: '2025-08-19',
      returnLocation: '-',
      containerNumber: '-',
      coload: '-',
      boatName: '-',
      eatDate: '-',
      boatContainerNumber: '-',
      createdAt: '-',
    },
    {
      id: 5,
      status: 'Approve',
      branch: 'HQ',
      bookingNumber: 'B2508-0005',
      job: 'IM',
      type: 'FCL',
      customer: 'บริษัท โกลเวีย จำกัด',
      cusInventory: '205-7801 8445',
      cusBL: '.......',
      origin: 'Airport BKK',
      destination: 'S/P-บางนา กม.22',
      returnDate: '2025-08-19',
      returnLocation: '-',
      containerNumber: '-',
      coload: '-',
      boatName: '-',
      eatDate: '-',
      boatContainerNumber: '-',
      createdAt: '-'
    }
  ]
}
