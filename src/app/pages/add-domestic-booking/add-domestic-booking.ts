import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddDomesticForm } from './add-domestic-form/add-domestic-form';

@Component({
  selector: 'app-add-domestic-booking',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, MatButtonToggleModule, AddDomesticForm],
  templateUrl: './add-domestic-booking.html',
  styleUrl: './add-domestic-booking.scss',
})
export class AddDomesticBooking {

}
