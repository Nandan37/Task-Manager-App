import { Component,Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-task-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {


  @Input() task!:any;
  @Output() toggleComplete = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
   @Output() statusChange = new EventEmitter<string>();

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
}
