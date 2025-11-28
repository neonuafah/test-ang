import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BookingFormComponent } from './form/form';

@Component({
    selector: 'app-add-import-booking',
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatButtonToggleModule, BookingFormComponent],
    templateUrl: './add-import-booking.html',
    styleUrl: './add-import-booking.scss',
})
export class AddImportBookingComponent {

}
