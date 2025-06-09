import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

// serviço que gerencia as tarefas
export class TodoService {
  private todos!: Todo[];

// inicializa o serviço
  constructor() {
    this.loadFromLocalStorage();
  }

// salva as tarefas no localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

// carrega as tarefas do localStorage
  private loadFromLocalStorage(): void {
    const todosJson = localStorage.getItem('todos');
    this.todos = todosJson ? JSON.parse(todosJson) : [
      { id: 1, title: 'make an awesome angular todo-list', completed: true },
      { id: 2, title: 'deploy my awesome angular todo-list project on github.io', completed: true },
      { id: 3, title: 'think about tasks I can example on my to do list project', completed: false },
      { id: 4, title: 'give up about the exemples (you already have them)', completed: false },
      { id: 5, title: "what can I do next? Let's do a new project! :)", completed: false }
    ];
    this.sortTodos();
  }

// retorna as tarefas
  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

// atualiza as tarefas no localStorage
  private updateLocalStorageAndSave(): void {
    this.saveToLocalStorage();
  }

// adiciona uma nova tarefa
  addTodo(newTodo: Todo): void {
    this.todos.push(newTodo);
    this.sortTodos();
    this.updateLocalStorageAndSave();
  }

// atualiza uma tarefa
  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

// remove uma tarefa
  deleteTodo(todoId: number): void {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.sortTodos();
      this.updateLocalStorageAndSave();
    } 
  }

// retorna um novo ID para a tarefa
  getTodoNewId(): number {
    return this.todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
  }

// ordena as tarefas
  sortTodos() {
    this.todos.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else if (!a.completed && b.completed) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // remove todas as tarefas
  clearAll(): void {
    this.todos = [];
    this.updateLocalStorageAndSave();
  }

// remove as tarefas completadas
  clearCompletedTasks(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.updateLocalStorageAndSave();
  }

  // Método central de confirmação com SweetAlert2
  confirmarExclusao(mensagem: string, onConfirm: () => void) {
    Swal.fire({
      title: 'Tem certeza?',
      text: mensagem,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
        Swal.fire('Pronto!', 'Ação realizada com sucesso.', 'success');
      }
    });
  }

}
