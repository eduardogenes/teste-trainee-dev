import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
// componente para adicionar uma nova tarefa
export class NewTaskComponent implements AfterViewInit {  
  newTaskTitle: string = '';

  @ViewChild('newTaskInput') newTaskInput!: ElementRef<HTMLInputElement>;

  constructor(private todoService: TodoService) { }

  ngAfterViewInit() {
    // foca no input assim que o componente aparece
    this.focusInput();
  }

  focusInput() {
    // Pequeno delay para garantir que o input já foi renderizado
    setTimeout(() => {
      this.newTaskInput.nativeElement.focus();
    });
  }

  addTask() {
    if (this.newTaskTitle.trim() === '') {
      alert('Por favor, insira um título para a tarefa.');
      return;
    }
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: this.newTaskTitle,
      completed: false 
    };

    this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';
    this.focusInput(); // foca novamente após adicionar
  }
}
