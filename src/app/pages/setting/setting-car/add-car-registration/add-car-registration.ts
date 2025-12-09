import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddCarRegistrationForm } from './add-car-registration-form/add-car-registration-form';
import { AddFixCost } from './add-fix-cost/add-fix-cost';
import { SocketService } from '../../../../services/socket.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CarSuccessModalComponent } from './car-success-modal.component';

@Component({
  selector: 'app-add-car-registration',
  imports: [AddCarRegistrationForm, AddFixCost, MatButtonModule, MatIconModule],
  templateUrl: './add-car-registration.html',
  styleUrl: './add-car-registration.scss',
})
export class AddCarRegistration {
  @ViewChild(AddCarRegistrationForm) formComponent!: AddCarRegistrationForm;
  @ViewChild(AddFixCost) fixCostComponent!: AddFixCost;

  constructor(
    private socketService: SocketService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  // Remove null, undefined, empty string values from object
  private removeEmptyFields(obj: any): any {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        // Keep value if it's not null, undefined, or empty string
        // Also keep arrays (even if empty) and numbers (including 0)
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            // For arrays, filter out empty objects and keep non-empty items
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
    // Collect form data from child component
    const formData = this.formComponent.getFormData();

    // Collect fix costs from child component
    const fixCosts = this.fixCostComponent.getFixCosts();

    // Prepare data to send to backend
    const rawData = {
      ...formData,
      status: 'Available',
      fixCosts: fixCosts
    };

    // Remove empty/null fields before sending
    const carRegistrationData = this.removeEmptyFields(rawData);

    // Emit to backend via socket
    this.socketService.emit('createCarRegistration', carRegistrationData);

    // Show success modal
    this.dialog.open(CarSuccessModalComponent, {
      width: '400px',
      disableClose: true,
      panelClass: 'success-modal-dialog'
    });
  }

  onCancel(): void {
    // Navigate back to setting-car page
    this.router.navigate(['/setting/car']);
  }
}
