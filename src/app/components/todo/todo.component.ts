import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  public todos = [
    { description: "EHEHEEHEHEHE" },
    { description: "AHdadadada" },
    { description: "AHdadadada" },
    { description: "AHdadadada" },
    { description: "AHdadadada" },
    { description: "AHdadadada" },
    { description: "AHdadadada" }
  ]

  saveTodo(event: Event) {
    const target = event.target as HTMLInputElement;
    this.todos.push({ description: target.value });
    target.value = '';
  }

}
