import { Component, Inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'

@Component({
  selector: 'app-dialog',
  imports: [ ReactiveFormsModule,CommonModule,
    ReactiveFormsModule,MatDatepickerModule,
    MatFormFieldModule, MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['Not Started', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value); 
    }
  }

  onCancel() {
    this.dialogRef.close(); 
  }
}
