import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
// componente para adicionar uma nova tarefa
export class NewTaskComponent {
  newTaskTitle: string = '';

  constructor(private todoService: TodoService) { }

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

  }
}
