import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { DemandeComponent } from './components/student/demande/demande.component';
import { ReclamationComponent } from './components/student/reclamation/reclamation.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
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


@NgModule({
  declarations: [
    AppComponent,
    // component for the Landing Page
    LandingPageComponent,
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
    DemandeItemComponent
  
  ],
  imports: [
    BrowserModule,
    RouterModule // this provides : <router-outlet></router-outlet> [routerLink] .....
  ],
  providers: [
    provideHttpClient(), // this provides the httpClient service that will be injected to our services
    provideRouter(routes) // this provides routes for the RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }