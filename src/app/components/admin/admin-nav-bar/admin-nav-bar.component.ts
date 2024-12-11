import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserClaims } from '../../../store/auth-feature/auth.selectors';

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

  constructor(private store: Store) {
    this.userClaimsState$ = store.select(selectUserClaims);
  }
}
