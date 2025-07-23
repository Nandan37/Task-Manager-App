import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {  Input, Output, EventEmitter } from '@angular/core';

import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskCardComponent, FormsModule, CommonModule ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  @Input() tasks: any[] = [];
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();


  
  ngOnInit(){

    this.LoadFromLocal()
  }

  SaveToLocal(){

    localStorage.setItem( 'tasks', JSON.stringify(this.tasks))
  }
  
  LoadFromLocal() {

    const data = localStorage.getItem('tasks')

    if(data){

     this.tasks= JSON.parse(data)
    }
  }

  onToggle(id: number) {
    this.toggle.emit(id);
    this.SaveToLocal()
  }

  onDelete(id: number) {
    this.delete.emit(id);
    this.SaveToLocal()
  }


  
  onStatusChange(taskId: number, newStatus: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      this.SaveToLocal()
    }
  }
  storageDelete(){
         
    console.log("button clicked");
    localStorage.clear();

  }
}
