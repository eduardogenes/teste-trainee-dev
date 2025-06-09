import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import Swal from 'sweetalert2';

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

  // remove uma tarefa
  deleteTodo(todoId: number) {
    this.todoService.confirmarExclusao(
      'Tem certeza que deseja excluir esta tarefa?',
      () => {
        this.todoService.deleteTodo(todoId);
        this.deletedTodo.emit(todoId);
      }
    );
  }

  // atualiza tarefa
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
    this.editTitle = this.todo.title;
  }

}
