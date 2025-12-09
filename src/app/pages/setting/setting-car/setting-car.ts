import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { SocketService } from '../../../services/socket.service';
import { Subscription } from 'rxjs';

interface CarRegistration {
  _id: string;
  status: string;
  vehicleNumber: string;
  fuelType: string;
  truckType: string;
  brand: string;
  company: string;
  registrationDate: Date;
  registrationRemaining: number;
  renewalDate: Date;
  renewalRemaining: number;
  expirationDate: Date;
  expirationRemaining: number;
  carWeight: number;
  cbm: number;
}

@Component({
  selector: 'app-setting-car',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    MatTableModule,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './setting-car.html',
  styleUrl: './setting-car.scss',
})
export class SettingCar implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'status',
    'vehicleNumber',
    'fuelType',
    'truckType',
    'brand',
    'company',
    'registrationDate',
    'registrationRemaining',
    'renewalDate',
    'renewalRemaining',
    'expirationDate',
    'expirationRemaining',
    'weight',
    'cbm'
  ];
  carRegistrations: CarRegistration[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Listen for car registrations list first
    const listSub = this.socketService.listen('carRegistrationsList').subscribe((data: any[]) => {
      this.carRegistrations = data.map(car => this.calculateRemainingDays(car));
      this.cdr.detectChanges();
    });
    this.subscriptions.push(listSub);

    // Listen for new car registration added (real-time update)
    const newCarSub = this.socketService.listen('server_notify_new_car_registration').subscribe((newCar: any) => {
      const carWithDays = this.calculateRemainingDays(newCar);
      this.carRegistrations = [carWithDays, ...this.carRegistrations];
      this.cdr.detectChanges();
    });
    this.subscriptions.push(newCarSub);

    // Request car registrations from backend with a small delay to ensure socket is ready
    setTimeout(() => {
      this.socketService.emit('getCarRegistrations', null);
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  calculateRemainingDays(car: any): CarRegistration {
    const today = new Date();

    const calcDays = (dateStr: string | Date | null): number => {
      if (!dateStr) return 0;
      const date = new Date(dateStr);
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    };

    return {
      ...car,
      registrationRemaining: calcDays(car.registrationDate),
      renewalRemaining: calcDays(car.renewalDate),
      expirationRemaining: calcDays(car.expirationDate)
    };
  }

  isDateExpired(date: Date | string | null): boolean {
    if (!date) return false;
    const checkDate = new Date(date);
    const today = new Date();
    return checkDate < today;
  }
}
