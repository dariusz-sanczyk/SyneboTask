import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilterEnum } from '../../models/Filter.enum';
import { TodosService } from '../../services/todos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

  public filterEnum = FilterEnum;
  public filter$: Observable<FilterEnum>;

  constructor(private todosService: TodosService) {
    this.filter$ = this.todosService.filter$;
  };

  public selectFilter(filterType: FilterEnum): void {
    this.todosService.changeFilter(filterType);
  };
}
