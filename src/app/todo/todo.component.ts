import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';

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

  // remove todas as tarefas
  clearAll() {
    if (this.todos.length > 0) {
      this.todoService.confirmarExclusao(
        'Deseja limpar todas as tarefas?',
        () => {
          this.todoService.clearAll();
          this.loadTodos();
        }
      );
    }
  }

  // remove as tarefas concluídas
  clearCompletedTasks() {
    this.todoService.confirmarExclusao(
      'Tem certeza que deseja limpar as tarefas concluídas?',
      () => {
        this.todoService.clearCompletedTasks();
        this.loadTodos();
      }
    );
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

  // ordena as tarefas
  sortTodos() {
    this.todos.sort((a, b) => a.title.localeCompare(b.title));
  }
  
  // gera um PDF com as tarefas

  gerarPDF() {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(22);
    doc.text('Lista de Tarefas', 20, 20);
    
    // Data
    doc.setFontSize(12);
    doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Tarefas
    let y = 50;
    this.todos.forEach((todo, index) => {
      doc.text(`${index + 1}. ${todo.title} - ${todo.completed ? 'Concluída' : 'Pendente'}`, 20, y);
      y += 10;
    });
    
    doc.save('lista-de-tarefas.pdf');
  }

}
