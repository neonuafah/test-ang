import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-add-car-registration-form',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './add-car-registration-form.html',
  styleUrl: './add-car-registration-form.scss',
})
export class AddCarRegistrationForm {
  files: File[] = [];

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
