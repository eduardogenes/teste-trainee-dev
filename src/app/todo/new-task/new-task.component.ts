import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import { Filter } from 'bad-words';
import { PORTUGUESE_BAD_WORDS } from '../../shared/utils/badwords-ptbr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements AfterViewInit {  
  newTaskTitle: string = '';
  private filter: any;

  @ViewChild('newTaskInput') newTaskInput!: ElementRef<HTMLInputElement>;

  constructor(private todoService: TodoService) {
    // Inicializa o filtro com configurações personalizadas
    this.filter = new Filter({ 
      emptyList: false, // Começa com lista vazia
      regex: /\w*|\W*/g,
      replaceRegex: /[\w\s]/g,
      splitRegex: /\s+/,
      placeHolder: '*',
    });
    
    // Adiciona as palavras ofensivas em português
    if (this.filter.addWords) {
      this.filter.addWords(...PORTUGUESE_BAD_WORDS);
    }
  }

  // mantém o foco após adicionar tarefa
  focusInput() {
    this.newTaskInput.nativeElement.focus();
  }

  // foca no input assim que o componente aparece
  ngAfterViewInit() {
    this.focusInput();
  }

  // adiciona uma nova tarefa
  addTask() {
    const taskText = this.newTaskTitle.trim();
    
    // verifica se o campo está vazio
    if (!taskText) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, insira um título para a tarefa.',
      });
        return;
    }

    // verifica se contém palavras ofensivas
    if (this.filter.isProfane(taskText)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Não é permitido cadastrar tarefas com palavras ofensivas.',
      });
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
    // foca no input após adicionar tarefa
    this.focusInput();
  }
}