import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/Todo.interface';
import { FilterEnum } from '../models/filter.enum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  todos$ = new BehaviorSubject<Todo[]>([])
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

  addTodo(todoDesc: string): void {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      description: todoDesc,
      isCompleted: false
    }

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);

  }
}
