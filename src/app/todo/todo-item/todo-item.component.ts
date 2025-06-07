import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();

  constructor(private todoService: TodoService) {}

  // remove a tarefa
  deleteTodo(): void {
    if (confirm('Tem certeza que deseja remover esta tarefa?')) {
      this.todoService.deleteTodo(this.todo.id);
    }
  }

  // atualiza a tarefa
  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }
}
