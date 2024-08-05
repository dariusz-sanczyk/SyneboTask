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

  todos = [
    { description: "EHEHEEHEHEHE" },
    { description: "AHdadadada" },
    { description: "AHdadadada" },
    { description: "AHdadadada" },
    { description: "AHdadadada" },
    { description: "AHdadadada" },
    { description: "AHdadadada" }
  ]

  saveTodo(event: any) {
    this.todos.push({ description: event.target.value });
    event.target.value = null;
  }

}
