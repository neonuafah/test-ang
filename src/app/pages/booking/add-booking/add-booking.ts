import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-add-booking',
  imports: [MatMenuModule, MatButtonModule, RouterLink],
  templateUrl: './add-booking.html',
  styleUrl: './add-booking.scss',
})
export class AddBooking {

}
