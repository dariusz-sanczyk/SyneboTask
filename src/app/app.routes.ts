import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'todo',
        loadComponent: () =>
          import('./components/todo/todo.component').then(
            (m) => m.TodoComponent
          ),
      },
      { path: '**', redirectTo: '/' },
];
