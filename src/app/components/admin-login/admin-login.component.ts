import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authState } from '../../store/auth-feature/auth.state';
import { selectAuthState } from '../../store/auth-feature/auth.selectors';
import { authActions } from '../../store/auth-feature/auth.actions';
import { STATE } from '../../store/state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  public authState$!: Observable<authState>;
  public STATE = STATE;
  public authForm!: FormGroup; // this form will be initialzed in the constructer and bound to the form in our html
// after initialization and binding , we can easily track the state of the form
// for example if its invalid or valid , or if a formControl is valid or not 

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.resetAuthState()); // here we turn the state to INITIAL to change the template
    this.authState$ = this.store.select(selectAuthState); // we select the token state to observe token changes, to know when to authenticate and when not to
    this.authForm = this.fb.group({ 
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

      // React to state changes to reset the form when state is LOADED
      this.authState$.subscribe(state => {
        if (state.state === STATE.loaded) {
          this.authForm.reset(); // Reset the form only when the state is LOADED
        }
      });
  }

  onSubmit(): void{ 
    if(this.authForm.valid) {
      this.store.dispatch(authActions.authenticate({payload : this.authForm.value}));
  }
}

}


/*
the purpose of this component , it provides a form that you can use to enter data (credentials) , click a button, then if credentials are correct, a jwt is added to the state
this component selects the auth state which is an object that changes, whenever an action is dipatched
if the credentials are correct, a jwt is parsed and added to a new state via the reducer
if credentials are wrong an error message is shown
what is happening, so when this component loads

ERROR (when credentials are wrong) the button is clickable again it shows the word connect, 
LOADING (when we click) the button should be disabled a loader should be loading
LOADED (when the jwt is loaded into the state)

the form : 
its either valid 
either invalid
if its valid the button should be clickable 
if invalid the button should be non clickable

*/