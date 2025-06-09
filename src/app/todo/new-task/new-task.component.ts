import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import { Filter } from 'bad-words';

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

  // mantém o foco após adicionar tarefa
  focusInput() {
    this.newTaskInput.nativeElement.focus();
  }

  // executa após a inicialização do componente
  ngAfterViewInit() {
    // foca no input assim que o componente aparece
    this.focusInput();
  }

  // adiciona uma nova tarefa
  addTask() {
    const filter = new Filter();
    const taskText = this.newTaskTitle.trim();
    
    // verifica se o campo está vazio
    if (!taskText) {
      alert('Por favor, insira um título para a tarefa.');
      return;
    }

    // verifica se contém palavras ofensivas
    if (filter.isProfane(taskText)) {
      alert('Não é permitido cadastrar tarefas com palavras ofensivas.');
      return;
    }

    // divide o texto pelo caractere | e remove espaços extras
    const tasks = taskText.split('|').map(t => t.trim()).filter(t => t);

    // adiciona cada tarefa individualmente
    tasks.forEach(title => {
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: title,
        completed: false
      };
      this.todoService.addTodo(newTodo);
    });

    this.newTaskTitle = '';
    // foca no input assim que a tarefa é adicionada
    this.focusInput();
  }
}