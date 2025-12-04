import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-setting-car',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, RouterLink],
  templateUrl: './setting-car.html',
  styleUrl: './setting-car.scss',
})
export class SettingCar {

}
