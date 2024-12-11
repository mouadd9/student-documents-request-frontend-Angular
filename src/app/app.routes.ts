import { Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { StudentComponent } from './components/student/student.component';
import { AdminComponent } from './components/admin/admin.component';
import { DemandeComponent } from './components/student/demande/demande.component';
import { ReclamationComponent } from './components/student/reclamation/reclamation.component';
import { DemandesComponent } from './components/admin/demandes/demandes.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HistoriqueComponent } from './components/admin/historique/historique.component';
import { ReclamationsComponent } from './components/admin/reclamations/reclamations.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentGuard } from './guards/student.guard';

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
    component: StudentComponent, canActivate: [StudentGuard],
    children: [
      { path: 'demande', component: DemandeComponent, canActivate: [StudentGuard] },
      { path: 'reclamation', component: ReclamationComponent, canActivate: [StudentGuard]  },
    ],
  },
  // lvl 2.2 dashboard-demandes are dynamic within AdminComponent
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'demandes', component: DemandesComponent ,canActivate: [AuthGuard],},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
      { path: 'reclamations', component: ReclamationsComponent , canActivate: [AuthGuard],},
      { path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard], },
    ],
  },
  
  { path: '**', redirectTo: '/home' },
];