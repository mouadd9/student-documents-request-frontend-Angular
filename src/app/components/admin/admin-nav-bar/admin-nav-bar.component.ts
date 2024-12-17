import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserClaims } from '../../../store/auth-feature/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  standalone: false,
  templateUrl: './admin-nav-bar.component.html',
  styleUrl: './admin-nav-bar.component.css',
})
export class AdminNavBarComponent {
  public userClaimsState$: Observable<{
    roles: string[];
    username: string;
  }>;

  constructor(private store: Store, public router: Router) {
    this.userClaimsState$ = store.select(selectUserClaims);
  }
}
