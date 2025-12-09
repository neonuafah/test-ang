import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { SocketService } from '../../../services/socket.service';
import { Subscription } from 'rxjs';

interface PartnerVehicleData {
  _id: string;
  branch: string;
  truckType: string;
  contact: string;
  phone: string;
  remark: string;
  status: string;
  fixCosts: any[];
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-partner-vehicle',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    MatTableModule,
  ],
  templateUrl: './partner-vehicle.html',
  styleUrl: './partner-vehicle.scss',
})
export class PartnerVehicle implements OnInit, OnDestroy {
  partnerVehicles: PartnerVehicleData[] = [];
  displayedColumns: string[] = ['status', 'branch', 'truckType', 'contact', 'phone', 'remark'];

  private subscription: Subscription | null = null;
  private newVehicleSubscription: Subscription | null = null;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    // Subscribe to receive partner vehicles list
    this.subscription = this.socketService.listen('partnerVehiclesList').subscribe({
      next: (vehicles: PartnerVehicleData[]) => {
        this.partnerVehicles = vehicles;
      }
    });

    // Subscribe to receive new partner vehicles in real-time
    this.newVehicleSubscription = this.socketService.listen('server_notify_new_partner_vehicle').subscribe({
      next: (newVehicle: PartnerVehicleData) => {
        this.partnerVehicles = [newVehicle, ...this.partnerVehicles];
      }
    });

    // Request partner vehicles from server
    this.socketService.emit('getPartnerVehicles', {});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.newVehicleSubscription?.unsubscribe();
  }
}

