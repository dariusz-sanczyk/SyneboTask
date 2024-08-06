import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Todo App',
    loadComponent: () =>
      import('./components/todo/todo.component').then(
        (m) => m.TodoComponent
      ),
  },
  { path: '**', redirectTo: '/' },
];
