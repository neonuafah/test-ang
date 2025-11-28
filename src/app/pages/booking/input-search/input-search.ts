import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-search',
  imports: [ReactiveFormsModule,  // จำเป็นสำหรับ [formControl]
    MatFormFieldModule,   // แก้ Error NG8001 (mat-form-field)
    MatInputModule,       // สำหรับ matInput
    MatIconModule,        // สำหรับ mat-icon
    MatButtonModule,      // สำหรับ mat-button
    CommonModule],       // (อาจต้องใช้ถ้ามี *ngIf, *ngFor)
  templateUrl: './input-search.html',
  styleUrl: './input-search.scss',
})
export class InputSearch implements OnInit, OnDestroy {

  // Output ส่งค่าออกไปหา Parent
  @Output() onSearch = new EventEmitter<string>();
  @Output() onFilterClick = new EventEmitter<void>();

  // Form Control สำหรับช่องค้นหา
  searchControl = new FormControl('');

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Logic: รอ 300ms หลังหยุดพิมพ์ -> เช็คว่าค่าเปลี่ยนจริงไหม -> ส่งค่า
    this.searchControl.valueChanges.pipe(
      debounceTime(400),        // รอ 400ms หลังหยุดพิมพ์
      distinctUntilChanged(),   // ถ้าค่าเหมือนเดิมไม่ต้องส่ง (เช่น พิมพ์แล้วลบเร็วๆ)
      takeUntil(this.destroy$)  // ป้องกัน memory leak
    ).subscribe((value) => {
      this.onSearch.emit(value || '');
    });
  }

  // ฟังก์ชันกดปุ่ม Filter
  openFilter() {
    this.onFilterClick.emit();
  }

  // ฟังก์ชันเคลียร์ช่องค้นหา
  clearSearch() {
    this.searchControl.setValue('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
