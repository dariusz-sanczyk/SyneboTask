import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/Todo.interface';
import { combineLatest, map, Observable } from 'rxjs';
import { FilterEnum } from '../../models/filter.enum';

@Component({
  selector: 'app-todo',
  standalone: true,
  host: { ngSkipHydration: 'true' },
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})

export class TodoComponent {
  public itemsLeft: Number = 0;
  private todoDescription: string = '';
  public todoList: Todo[] = [];
  public filteredTodos$: Observable<Todo[]>;

  constructor(private todosService: TodosService) {
    this.filteredTodos$ = combineLatest([this.todosService.todos$,
    this.todosService.filter$]).pipe(map(([todos, filter]: [Todo[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter((t) => !t.isCompleted);
      } else if (filter === FilterEnum.completed) {
        return todos.filter((t) => t.isCompleted);
      }
      return todos;
    }));
  };

  saveTodo(event: Event) {
    const target = event.target as HTMLInputElement;
    this.todoDescription = target.value;
    this.todosService.addTodo(this.todoDescription);
    target.value = '';
  };
};
