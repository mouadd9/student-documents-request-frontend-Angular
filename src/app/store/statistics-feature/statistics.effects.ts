import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StatsService } from '../../services/stats.service';
import { statisticsActions } from './statistics.actions';



@Injectable()
export class StatisticsEffects {

  fetchStatisticsEffect$: Observable<Action>;

  constructor(private action$: Actions,private statisticsService: StatsService) {
      this.fetchStatisticsEffect$ = createEffect(() =>
        this.action$.pipe(
          ofType(statisticsActions.fetchStatistic),
          mergeMap(() => {
            return this.statisticsService.fetchStats().pipe(
              map(
                (stat) => {
                  return statisticsActions.fetchStatisticSuccess({
                    payload: stat,
                  });
                }
              ),
              catchError((err) =>
                of(statisticsActions.fetchStatisticError({ payload: err.message }))
              )
            );
          })
        )
      )

   
  }
}
