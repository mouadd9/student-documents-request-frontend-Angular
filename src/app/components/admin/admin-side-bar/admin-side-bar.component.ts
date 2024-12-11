import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../../store/auth-feature/auth.actions';

@Component({
  selector: 'app-admin-side-bar',
  standalone: false,
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css'
})
export class AdminSideBarComponent {

  activeButton: string = 'dashboard'; // Set default active button

  constructor(private store: Store, private router: Router) {}

  setActiveButton(buttonName: string) {
    this.activeButton = buttonName;
  }

  onLogout() {
    this.store.dispatch(authActions.logout()) // this clears out the state
    localStorage.removeItem('jwt-token'); // this removes the token from local storage
    this.router.navigate(['/login']); // this redirects to login
  }
}
