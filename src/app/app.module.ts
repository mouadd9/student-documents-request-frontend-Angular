import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { DemandeComponent } from './components/student/demande/demande.component';
import { ReclamationComponent } from './components/student/reclamation/reclamation.component';
import { HomeComponent } from './components/home/landing-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentNavBarComponent } from './components/student/student-nav-bar/student-nav-bar.component';
import { AdminNavBarComponent } from './components/admin/admin-nav-bar/admin-nav-bar.component';
import { AdminSideBarComponent } from './components/admin/admin-side-bar/admin-side-bar.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DemandesComponent } from './components/admin/demandes/demandes.component';
import { DemandesListComponent } from './components/admin/demandes/demandes-list/demandes-list.component';
import { DemandesNavBarComponent } from './components/admin/demandes/demandes-nav-bar/demandes-nav-bar.component';
import { DemandeItemComponent } from './components/admin/demandes/demandes-list/demande-item/demande-item.component';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';

// store
import { StoreModuleConfig } from './store/store.module'; // we defined the store in a separate module
import { HistoriqueComponent } from './components/admin/historique/historique.component';





@NgModule({
  declarations: [
    AppComponent,
    // component for the Landing Page
    HomeComponent,
    // components for the Student Template
    StudentComponent,
    StudentNavBarComponent,
    DemandeComponent,
    ReclamationComponent,
    // components for the Admin Login Page
    AdminLoginComponent,
    // components for the Admin
    AdminComponent,
    AdminNavBarComponent,
    AdminSideBarComponent,
    DashboardComponent,
    DemandesComponent,
    DemandesNavBarComponent,
    DemandesListComponent,
    DemandeItemComponent,  
  ],
  imports: [
    BrowserModule,
    RouterModule, // this provides : <router-outlet></router-outlet> [routerLink] .....
    ReactiveFormsModule,
    StoreModuleConfig,  
  ],
  providers: [
    provideHttpClient(), // this provides the httpClient service that will be injected to our services
    provideRouter(routes) // this provides routes for the RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




// When the store is initialized, it creates an empty object for the global state.
    // each registered reducer provides the store with an initial slice of state
    /*store : 
     {
      demandes : {demandes: [], demandesState : state.INITIAL, errorMessage : "" }, // this is modified via its reducer , each time an action is dispatched we change this 
      reclamations : {reclamations: [], reclamationsState : state.INITIAL, errorMessage : "" } // this is modified via its reducer
     } 
    */

// Redux : 
/*
When an action is dispatched the following happens : 
  - teh action is broadcasted to all reducers 
  - each reducers passes the action and the current state in its parameters
  - the reducer uses the dispatched action , and uses teh current state, each reducer is mapped to a slice of state 
  - that slice of state in the store provides the reducer with the current state 

*/

/*
so we should do the following : 
 - we create reducers
 - associate them to specific slices of state (the state affected by the reducer)
 - declare an initial state in the reducer and pass it 
 - and then create logic of how the state will change depending on the action types dispatched

*/