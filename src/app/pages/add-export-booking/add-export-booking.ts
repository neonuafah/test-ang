import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddExportForm } from './add-export-form/add-export-form';

@Component({
  selector: 'app-add-export-booking',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, AddExportForm],
  templateUrl: './add-export-booking.html',
  styleUrl: './add-export-booking.scss',
})
export class AddExportBooking {

}
