import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SocketService } from '../../../../../services/socket.service';

export interface AddOptionData {
    category: string; // e.g., 'Branch', 'Brand'
    title: string;    // e.g., 'Add Branch'
}

@Component({
    selector: 'app-add-option-modal',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule
    ],
    templateUrl: './add-option-modal.component.html',
    styleUrls: ['./add-option-modal.component.scss']
})
export class AddOptionModalComponent {
    newValue: string = '';

    constructor(
        public dialogRef: MatDialogRef<AddOptionModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddOptionData,
        private socketService: SocketService
    ) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.newValue.trim()) {
            // Emit event to add new setting
            this.socketService.emit('createSetting', {
                category: this.data.category,
                value: this.newValue.trim()
            });

            this.dialogRef.close(this.newValue.trim());
        }
    }
}
