import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { statisticsState } from '../../../store/statistics-feature/statistics.state';
import { Store } from '@ngrx/store';
import { selectStatisticsState } from '../../../store/statistics-feature/statistics.selectors';
import { statisticsActions } from '../../../store/statistics-feature/statistics.actions';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public statisticsState$: Observable<statisticsState>; 
  constructor(private store: Store){
    this.statisticsState$ = store.select(selectStatisticsState); // we select an observable from the global state
  }
  ngOnInit(): void {
    this.store.dispatch(statisticsActions.fetchStatistic());
  }
}
