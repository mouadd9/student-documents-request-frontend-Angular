import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store'
import { demandeReducer } from './demandes-feature/demandes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DemandesEffects } from './demandes-feature/demandes.effects';


// here we will import the store and configure it with a the reducer for the demande feature

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    StoreModule.forFeature('demandes', demandeReducer), // its like saying hey reducer you manage this slice of state 
    // StoreModule.forFeature('reclamations', reclamationReducer)
    
    // EffectsModule.forFeature([ReclamationsEffects])
    
  ]
})
export class StateModule { }


