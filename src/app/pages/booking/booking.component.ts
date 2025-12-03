import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookingTable } from './booking-table/booking-table';
import { InputSearch } from './input-search/input-search';
import { AddBooking } from './add-booking/add-booking';
import { BookingService } from '../../services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, BookingTable, InputSearch, AddBooking],
  templateUrl: './booking.html',
  styleUrls: ['./booking.scss']
})
export class BookingComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['status', 'branch', 'bookingNumber', 'job', 'type', 'customer', 'cusInventory', 'cusBL', 'origin', 'destination', 'returnDate', 'returnLocation', 'containerNumber', 'coload', 'boatName', 'eatDate', 'boatContainerNumber', 'createdAt'];
  data: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {


    // Subscribe to bookings list FIRST before requesting
    const bookingsListSub = this.bookingService.onBookingsList().subscribe({
      next: (bookings) => {
        this.data = this.mapBookingsToTableData(bookings);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Error receiving bookings:', err);
      }
    });
    this.subscriptions.push(bookingsListSub);

    // Subscribe to real-time new booking notifications
    const newBookingSub = this.bookingService.onNewBooking().subscribe({
      next: (newBooking) => {

        const mappedBooking = this.mapSingleBooking(newBooking);
        // Add new booking to the beginning of the array
        this.data = [mappedBooking, ...this.data];
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Error receiving new booking:', err);
      }
    });
    this.subscriptions.push(newBookingSub);

    // NOW request bookings from server (after listeners are set up)

    this.bookingService.getBookings();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private mapBookingsToTableData(bookings: any[]): any[] {
    return bookings.map(booking => this.mapSingleBooking(booking));
  }

  private mapSingleBooking(booking: any): any {
    return {
      id: booking._id,
      status: booking.status || '-',
      branch: booking.branch || '-',
      bookingNumber: booking.booking_No || '-',
      job: booking.job || '-',
      type: booking.type || '-',
      customer: booking.customer_name || '-',
      cusInventory: booking.customer_invoice || '-',
      cusBL: booking.mawb_number || booking.hawb_number || '-',
      origin: booking.origin || '-',
      destination: booking.destination || '-',
      returnDate: booking.container_return_date ? new Date(booking.container_return_date).toLocaleDateString() : '-',
      returnLocation: booking.container_return_location || '-',
      containerNumber: booking.container_type || '-',
      coload: booking.coload || '-',
      boatName: booking.ship_name || '-',
      eatDate: booking.eta_date ? new Date(booking.eta_date).toLocaleDateString() : '-',
      boatContainerNumber: booking.transport_number || '-',
      createdAt: booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : '-'
    };
  }
}
