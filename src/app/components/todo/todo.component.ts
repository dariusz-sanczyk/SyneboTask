import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/Todo.interface';
import { combineLatest, map, Observable } from 'rxjs';
import { FilterEnum } from '../../models/Filter.enum';
import { media } from './../../utils/media';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})

export class TodoComponent {
  private todoDescription: string = '';
  public itemsLeft$: Observable<number>;
  public itemsLeftText$: Observable<string>;
  public filteredTodos$: Observable<Todo[]>;
  public filterEnum = FilterEnum;
  public filter$: Observable<FilterEnum>;
  public desktop$ = media(`(min-width: 1124px)`)
  public mobile$ = media(`(max-width: 1124px)`)
  public todos: Todo[] = []

  constructor(private todosService: TodosService) {
    this.filteredTodos$ = combineLatest([this.todosService.todos$,
    this.todosService.filter$]).pipe(map(([todos, filter]: [Todo[], FilterEnum]) => {
      this.todos = todos;
      if (filter === FilterEnum.active) {
        return todos.filter((t) => !t.isCompleted);
      } else if (filter === FilterEnum.completed) {
        return todos.filter((t) => t.isCompleted);
      }
      return todos;
    }));

    this.itemsLeft$ = this.todosService.todos$.pipe(map((todos) => todos.filter((t) => !t.isCompleted).length));
    this.itemsLeftText$ = this.itemsLeft$.pipe(map((items) => `item${items === 1 ? '' : 's'} left`));
    this.filter$ = this.todosService.filter$
  };

  public saveTodo(event: Event) {
    const target = event.target as HTMLInputElement;
    this.todoDescription = target.value;
    this.todosService.addTodo(this.todoDescription);
    target.value = '';
  };

  public selectFilter(filterType: FilterEnum): void {
    this.todosService.changeFilter(filterType);
  }

  public changeTodoStatus(id: string): void {
    this.todosService.changeTodoStatus(id);
  };

  public removeTodo(id: string): void {
    this.todosService.removeTodo(id);
  };

  public removeCompleted() {
    this.todosService.removeCompleted();
  };

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.todosService.updateTodos(this.todos); // Zaktualizuj stan w serwisie
  }
};




