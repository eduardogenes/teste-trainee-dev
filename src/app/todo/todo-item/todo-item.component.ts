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
  @Output() updatedTodo = new EventEmitter<Todo>();  // Novo evento para atualização
  isEditing = false;  // Controla se está no modo edição
  editTitle = '';     // Armazena o título em edição

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

  // ativa o modo de edição
  startEditing(): void {
    this.isEditing = true;
    this.editTitle = this.todo.title;
  }

  // salva as alterações
  saveEdit(): void {
    const newTitle = this.editTitle.trim();
    if (newTitle) {  // Só salva se não estiver vazio
      this.todo.title = newTitle;
      this.updatedTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  // Cancela a edição
  cancelEdit(): void {
    this.isEditing = false;
  }

}
