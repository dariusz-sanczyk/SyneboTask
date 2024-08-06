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
      id: Math.random().toString(10),
      description: todoDesc,
      isCompleted: false
    };

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  };

  changeFilter(filterType: FilterEnum): void {
    this.filter$.next(filterType);
  };

  changeTodoStatus(id: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        };
      };
      return todo;
    });
    this.todos$.next(updatedTodos);
  };

  removeTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().filter((t) => t.id !== id);
    this.todos$.next(updatedTodos);
  };

  removeCompleted() {
    const updatedTodos = this.todos$.getValue().filter((t) => t.isCompleted === false);
    this.todos$.next(updatedTodos);
  };
}
