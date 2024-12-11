import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserClaims } from '../store/auth-feature/auth.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUserClaims).pipe(
      map((claims) => {
        if (claims.roles.includes('ADMIN')) {
          return true; // User is an admin
        } else {
          this.router.navigate(['/']); // Redirect if not an admin
          return false; // Access denied
        }
      })
    );
  }
  
}



/*

Prevents Unauthorized Access:
Before navigating to a route, CanActivate runs logic to decide if the user can proceed to that route.

Runs Before Route Activation:
It intercepts the navigation process and either:

Allows navigation (returns true).
Prevents navigation (returns false) and optionally redirects the user to another route (e.g., a login page).

*/
