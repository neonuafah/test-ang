import { Component } from '@angular/core';
import { AddCarRegistrationForm } from './add-car-registration-form/add-car-registration-form';
import { AddFixCost } from './add-fix-cost/add-fix-cost';

@Component({
  selector: 'app-add-car-registration',
  imports: [AddCarRegistrationForm, AddFixCost],
  templateUrl: './add-car-registration.html',
  styleUrl: './add-car-registration.scss',
})
export class AddCarRegistration {

}
