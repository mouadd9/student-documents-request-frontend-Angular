import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authState } from '../../store/auth-feature/auth.state';
import { selectTokenState } from '../../store/auth-feature/auth.selectors';
import { authActions } from '../../store/auth-feature/auth.actions';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  // here we will select the authState from the global store
  // now each time a new value is there we will get it 
  // meaning if a user clicked and sent credentials 
  // the state will change and we will get claims , if the claims have the correct role we will redirect to the admin
  // not that authState has info about jwt claims ...... and even teh username , meaning we will send the username via router
  public authState$: Observable<authState>
  constructor(private store: Store) {
    this.authState$ = store.select(selectTokenState); // this cuses the store to create an observable that emits new values whenever an authentication action is dispatched
  }

  ngOnInit(): void {
    // okay now we will test by dispatching a fetchTokenAction and to see if we get the claims 
    this.store.dispatch(authActions.authenticate({payload : {username: 'mouad', password:'test'}}));
    this.authState$.subscribe({
      next: (authState) => console.log(authState)
    })
  }

}
