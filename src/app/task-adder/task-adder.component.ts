import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-adder',
  standalone: true,
  imports: [FormsModule, CommonModule, TaskListComponent, ReactiveFormsModule, MatDialogModule, MatDialogActions, DialogComponent],
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css']
})
export class TaskAdderComponent {


  tasks: any[] = [];


  filteredTasks: any[] = [];

  
  
  
  showAddForm = false;
   taskbar!: FormGroup;

  
  showFilterDropdown = false;

  searchQuery: string = '';

  
  newTask: any = {
    title: '',
    dueDate: '',
    priority: '',
    completed: false,
    status: ''
  };

  
  filters = {
    priority: '',
    fromDate: '',
    toDate: '',
    sortBy: ''
  };

  SaveToLocal(){

    localStorage.setItem( 'tasks', JSON.stringify(this.tasks))
  }

  // constructor() {
  //   this.applyFilters();
    
  // }

  toggleForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  addTask(x: any) {
  if (!x.title || !x.dueDate || !x.priority) return;

  const task = {
    id: Date.now(),
    title: x.title,
    dueDate: x.dueDate,
    priority: x.priority,
    completed: false,
    status: x.status || ''  
  };

  this.tasks.push(task);
  this.applyFilters();
  this.SaveToLocal();
}

  toggleComplete(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) task.completed = !task.completed;
    this.applyFilters();
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.applyFilters();
    this.SaveToLocal()
  }

 

  applyFilters() {
    let result = [...this.tasks];

    
    if (this.filters.priority) {
      result = result.filter(task => task.priority === this.filters.priority);
    }

    
    if (this.filters.fromDate) {
      result = result.filter(task => task.dueDate >= this.filters.fromDate);
    }

    if (this.filters.toDate) {
      result = result.filter(task => task.dueDate <= this.filters.toDate);
    }
     
    if (this.searchQuery.trim()) {
    const query = this.searchQuery.toLowerCase();
    result = result.filter(task =>
      task.title.toLowerCase().includes(query)
    );
  }
    
    if (this.filters.sortBy === 'dueDate') {
      result.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    } else if (this.filters.sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    this.filteredTasks = result;
  }

  resetFilters() {
    this.filters = {
      priority: '',
      fromDate: '',
      toDate: '',
      sortBy: ''
    };
    this.applyFilters();
    this.showFilterDropdown = false;
  }

 

  ngOnInit(): void {
    
    
    const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    this.tasks = JSON.parse(storedTasks);
  }

  this.applyFilters();
  }
  
   constructor(private dialog: MatDialog) {
    
   }
   
  

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log('Dialog closed with:', result);
      if (result) {
        this.addTask(result);
      }
    });
  }
  
  updateTask(updated: any) {
    console.log('Received task update:', updated);

    if (updated?.id == null) {
    console.warn('Updated task has no id:', updated);
    return;
  }

  const idx = this.tasks.findIndex(t => t.id === updated.id);
  if (idx === -1) {
    console.warn('Task not found, id:', updated.id);
    return; 
  }

  
  this.tasks = this.tasks.map((t, i) => i === idx ? { ...t, ...updated } : t);

  
  this.filteredTasks = [...this.tasks];
  this.SaveToLocal();
  }
}