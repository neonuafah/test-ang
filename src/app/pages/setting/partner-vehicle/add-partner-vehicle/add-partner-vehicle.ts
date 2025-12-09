import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { SocketService } from '../../../../services/socket.service';
import { AddOptionModalComponent } from '../../setting-car/add-car-registration/add-option-modal/add-option-modal.component';
import { AddFixCost } from '../../setting-car/add-car-registration/add-fix-cost/add-fix-cost';
import { PartnerVehicleSuccessModalComponent } from './partner-vehicle-success-modal.component';

@Component({
  selector: 'app-add-partner-vehicle',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    AddFixCost
  ],
  templateUrl: './add-partner-vehicle.html',
  styleUrl: './add-partner-vehicle.scss',
})
export class AddPartnerVehicle implements OnInit {
  @ViewChild(AddFixCost) fixCostComponent!: AddFixCost;

  // Form data properties
  branch: string = '';
  truckType: string = '';
  contact: string = '';
  phone: string = '';
  remark: string = '';
  isActive: boolean = true;

  // Dropdown Options
  branchOptions: any[] = [];
  truckTypeOptions: any[] = [];

  constructor(
    private socketService: SocketService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initial fetch for categories (same as add-car-registration)
    this.socketService.emit('getSettings', 'Branch');
    this.socketService.emit('getSettings', 'TruckType');

    // Listen for incoming settings list
    this.socketService.listen('settingsList').subscribe((data: any) => {
      const { category, options } = data;
      if (category === 'Branch') this.branchOptions = options;
      if (category === 'TruckType') this.truckTypeOptions = options;
    });

    // Listen for new setting added (real-time update)
    this.socketService.listen('newSettingAdded').subscribe((newOption: any) => {
      if (newOption.category === 'Branch') this.branchOptions.push(newOption);
      if (newOption.category === 'TruckType') this.truckTypeOptions.push(newOption);
    });
  }

  openAddOptionModal(category: string, title: string) {
    this.dialog.open(AddOptionModalComponent, {
      width: '400px',
      data: { category, title }
    });
  }

  // Remove empty/null fields before sending
  private removeEmptyFields(obj: any): any {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            const filteredArray = value.map((item: any) => {
              if (typeof item === 'object' && item !== null) {
                return this.removeEmptyFields(item);
              }
              return item;
            }).filter((item: any) => {
              if (typeof item === 'object' && item !== null) {
                return Object.keys(item).length > 0;
              }
              return true;
            });
            if (filteredArray.length > 0) {
              cleaned[key] = filteredArray;
            }
          } else {
            cleaned[key] = value;
          }
        }
      }
    }
    return cleaned;
  }

  onSave(): void {
    // Collect fix costs from child component
    const fixCosts = this.fixCostComponent.getFixCosts();

    // Prepare data to send to backend
    const rawData = {
      branch: this.branch,
      truckType: this.truckType,
      contact: this.contact,
      phone: this.phone,
      remark: this.remark,
      status: this.isActive ? 'Active' : 'Inactive',
      fixCosts: fixCosts
    };

    // Remove empty/null fields before sending
    const partnerVehicleData = this.removeEmptyFields(rawData);

    // Emit to backend via socket
    this.socketService.emit('createPartnerVehicle', partnerVehicleData);

    // Show success modal
    this.dialog.open(PartnerVehicleSuccessModalComponent, {
      width: '400px',
      disableClose: true,
      panelClass: 'success-modal-dialog'
    });
  }

  onCancel(): void {
    this.router.navigate(['/setting/partner-vehicle']);
  }
}
