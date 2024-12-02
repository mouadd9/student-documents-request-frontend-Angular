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


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      demandes: demandeReducer, 
      reclamations: reclamationsReducer
    }),
    EffectsModule.forRoot([
      DemandesEffects,
      reclamationsEffects
    ])
  ],
  providers: [
    provideStoreDevtools({})
  ]
})
export class StoreModuleConfig { }
