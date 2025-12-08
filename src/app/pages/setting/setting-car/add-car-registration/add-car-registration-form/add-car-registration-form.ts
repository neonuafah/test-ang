import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { SocketService } from '../../../../../services/socket.service';
import { AddOptionModalComponent } from '../add-option-modal/add-option-modal.component';


@Component({
  selector: 'app-add-car-registration-form',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-car-registration-form.html',
  styleUrl: './add-car-registration-form.scss',
})
export class AddCarRegistrationForm implements OnInit {
  files: File[] = [];

  // Dropdown Options
  branchOptions: any[] = [];
  truckTypeOptions: any[] = [];
  brandOptions: any[] = [];
  fuelTypeOptions: any[] = [];
  insuranceOptions: any[] = [];

  constructor(
    private socketService: SocketService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Initial fetch for all categories
    this.socketService.emit('getSettings', 'Branch');
    this.socketService.emit('getSettings', 'TruckType');
    this.socketService.emit('getSettings', 'Brand');
    this.socketService.emit('getSettings', 'FuelType');
    this.socketService.emit('getSettings', 'Insurance');

    // Listen for incoming settings list
    this.socketService.listen('settingsList').subscribe((data: any) => {
      const { category, options } = data;
      if (category === 'Branch') this.branchOptions = options;
      if (category === 'TruckType') this.truckTypeOptions = options;
      if (category === 'Brand') this.brandOptions = options;
      if (category === 'FuelType') this.fuelTypeOptions = options;
      if (category === 'Insurance') this.insuranceOptions = options;
    });

    // Listen for new setting added (real-time update)
    this.socketService.listen('newSettingAdded').subscribe((newOption: any) => {
      if (newOption.category === 'Branch') this.branchOptions.push(newOption);
      if (newOption.category === 'TruckType') this.truckTypeOptions.push(newOption);
      if (newOption.category === 'Brand') this.brandOptions.push(newOption);
      if (newOption.category === 'FuelType') this.fuelTypeOptions.push(newOption);
      if (newOption.category === 'Insurance') this.insuranceOptions.push(newOption);

      // Sort options after adding new one
      this.sortOptions();
    });
  }

  sortOptions() {
    // Optional: Sort logic if needed, backend already sorts initial fetch
  }

  openAddOptionModal(category: string, title: string) {
    this.dialog.open(AddOptionModalComponent, {
      width: '400px',
      data: { category, title }
    });
  }

  // ทำงานเมื่อมีการเลือกไฟล์
  onFileSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.push(selectedFiles[i]);
      }
    }
    // Reset input value so the same file can be selected again if needed
    event.target.value = '';
  }

  // ทำงานเมื่อกดปุ่มกากบาท (ลบไฟล์)
  removeFile(index: number) {
    this.files.splice(index, 1);
  }
}
