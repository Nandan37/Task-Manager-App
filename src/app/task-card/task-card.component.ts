import { Component,Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, FormsModule, MatDialogModule,MatDialogActions, DialogComponent,],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {


  @Input() task!:any;
  @Output() toggleComplete = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
   @Output() statusChange = new EventEmitter<string>();
   @Output() updateTask = new EventEmitter<any>();
  
  onToggle() {
    this.toggleComplete.emit();
  }

  onDeleteConfirm() {
    
    const confirmed = window.confirm("Are you sure you want to delete the task?");
    if (confirmed){
      this.delete.emit(this.task.id);
    }
  }
  
  updateStatus(newStatus: string) {
    this.statusChange.emit(newStatus);
  }

  constructor(private dialog: MatDialog) {}

  
  
     updateTaskDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with:', result);
      if (result) {
        result.id = this.task.id; 
        this.updateTask.emit(result); 
      }
    });
  }
  
}
