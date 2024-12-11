import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { authActions } from './store/auth-feature/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // when the user first authenticated and dispatched an authentication action, and got the token from the backend
  // we stored the token in local storage
  // so that when we reload the page (the state empties)
  // we will use that stored token, by decoding it and extracting claims then dispatching an action that will refresh the state to have the claims, and the routingn will take place to dashboard
  constructor(private store: Store){}
  ngOnInit(): void {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.store.dispatch(authActions.authenticateSuccessWithClaims({
        payload: {
          jwt: token,
          userClaims: {
            username: decodedToken.sub,
            roles: (decodedToken as any).scope,
          },
        },
      }));
    }
  }}
