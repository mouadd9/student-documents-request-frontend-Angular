import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Add custom logic to allow access to specific routes
    const allowedRoutes = ['/home','/student/demande', '/student/reclamation'];

    // Check if the current route is allowed
    const currentRoute = this.router.url;
    if (allowedRoutes.includes(currentRoute)) {
      return true; // Allow access
    } else {
      // Redirect to the default student route or home
      this.router.navigate(['/home']);
      return false;
    }
  }
}
