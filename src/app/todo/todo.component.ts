import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

// Componente principal da aplicação
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) { }

  // carrega as tarefas do localStorage
  ngOnInit(): void {
    this.loadTodos();
  }

  // carrega as tarefas do localStorage
  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  // adiciona uma nova tarefa
  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
  }

  // atualiza uma tarefa
  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  // remove uma tarefa
  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  // remove todas as tarefas
  clearAll() {
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  // remove as tarefas concluídas
  clearCompletedTasks() {
    this.todoService.clearCompletedTasks();
    this.loadTodos();
  }

  // alterna a visibilidade das tarefas concluídas
  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  // filtra as tarefas concluídas
  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
  }

  // retorna o texto do botão 'Limpar Tudo'
  get labelClearAll(){
    return 'Limpar Tudo'
  }
}
