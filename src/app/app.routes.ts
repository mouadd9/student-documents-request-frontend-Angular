import { Routes} from '@angular/router';
import { HomeComponent } from './components/home/landing-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { StudentComponent } from './components/student/student.component';
import { AdminComponent } from './components/admin/admin.component';
import { DemandeComponent } from './components/student/demande/demande.component';
import { ReclamationComponent } from './components/student/reclamation/reclamation.component';
import { DemandesComponent } from './components/admin/demandes/demandes.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

// the paths we have
//---------level 1
// "/home"
// "/admin"
// "/student"
// "/login"

//---------level 2.1
//note: "/student" has a "student-nav-bar"
// "/student/demande"
// "/student/reclamation"

//---------level 2.2
//note: "/admin" has an "admin-nav-bar + admin-side-bar"
//note: "/admin/demandes" has a "demandes-nav-bar + demandes-list"
// "/admin/dashboard"
// "/admin/demandes"

export const routes: Routes = [
  // lvl 1 home-login-student-admin are dynamic within AppComponent
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // blank URL
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AdminLoginComponent },
  // lvl 2.1 demande-reclamation are dynamic within StudentComponent
  {
    path: 'student',
    component: StudentComponent,
    children: [
      { path: 'demande', component: DemandeComponent },
      { path: 'reclamation', component: ReclamationComponent },
    ],
  },
  // lvl 2.2 dashboard-demandes are dynamic within AdminComponent
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'demandes', component: DemandesComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];