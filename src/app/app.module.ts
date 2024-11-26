import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentComponent } from './components/student/student.component';
import { DemandeComponent } from './components/student/demande/demande.component';
import { ReclamationComponent } from './components/student/reclamation/reclamation.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    // component for the Landing Page
    LandingPageComponent,
    // components for the Student Template
    StudentComponent,
    DemandeComponent,
    ReclamationComponent,
    // components for the Admin Login Page
    AdminLoginComponent,
    // components for the Admin
    AdminComponent
    

    // other components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    // other modules
  ],
  providers: [], // Providing the service here
  bootstrap: [AppComponent]
})
export class AppModule { }