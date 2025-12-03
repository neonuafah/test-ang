import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-booking-table',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './booking-table.html',
  styleUrl: './booking-table.scss',
})
export class BookingTable {
  displayedColumns: string[] = ['status', 'branch', 'bookingNumber', 'job', 'type', 'customer', 'cusInventory', 'cusBL', 'origin', 'destination', 'returnDate', 'returnLocation', 'containerNumber', 'coload', 'boatName', 'eatDate', 'boatContainerNumber', 'createdAt'];

  @Input() data: any[] = [];
}
