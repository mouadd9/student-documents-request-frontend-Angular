import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// reducers 
import { demandeReducer } from './demandes-feature/demandes.reducer';

// effects 
import { DemandesEffects } from './demandes-feature/demandes.effects';
import { reclamationsReducer } from './reclamations-feature/reclamations.reducer';
import { reclamationsEffects } from './reclamations-feature/reclamations.effects';
import { statisticsReducer } from './statistics-feature/statistics.reducer';
import { StatisticsEffects } from './statistics-feature/statistics.effects';
import { authReducer } from './auth-feature/auth.reducer';
import { AuthEffects } from './auth-feature/auth.effects';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      demandes: demandeReducer, 
      reclamations: reclamationsReducer,
      statistics: statisticsReducer,
      token: authReducer
    }),
    EffectsModule.forRoot([
      DemandesEffects,
      reclamationsEffects,
      StatisticsEffects,
      AuthEffects
    ])
  ],
  providers: [
    provideStoreDevtools({})
  ]
})
export class StoreModuleConfig { }
