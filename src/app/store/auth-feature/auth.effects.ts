import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { catchError, delay, map, mergeMap, Observable, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { authActions } from './auth.actions';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';




@Injectable()
export class AuthEffects {

  fetchTokenEffect$: Observable<Action>; // when an action of type authenticate is dispatched, we will get the token
  navigateAfterSuccess$: Observable<Action>;  

  constructor(private action$: Actions, private authService: AuthService, private router: Router) {
      this.fetchTokenEffect$ = createEffect(() =>
        this.action$.pipe(
          ofType(authActions.authenticate),
          mergeMap((action) => {
            console.log("---------------HERE THE DISPATCHED ACTION OF TYPE AUTHENTICATE IS HAS REACHED EFFECTS---------")
            console.log("------------------------------------------------------------------------")
            console.log("------------------------------------------------------------------------")
            return this.authService.fetchTokenAsync(action.payload).pipe(
              map(
                (token) => { // this variable has the coded jwt, we need to decode it and extract the claims , here its in this form : {'access-token':'token'} ;
                    const access_token = token['access_token'];
                    const decodedToken = jwtDecode(access_token);
                    localStorage.setItem('jwt-token', access_token); // here we put the token in our local storage
                  return authActions.authenticateSuccessWithClaims({ // when the authenticateSuccess action is dispatched we will pass a decoded token to it
                    payload: {
                        userClaims : {
                            'username': (decodedToken as any).sub,
                            'roles' :  (decodedToken as any).scope,
                            
                        },
                        'jwt': access_token
                    },
                  });
                }
              ),
              catchError((err) =>
                of(authActions.authenticateError({ payload: err.message }))
              )
            );
          })
        )
      )

      this.navigateAfterSuccess$ = createEffect(()=>
      this.action$.pipe(
        ofType(authActions.authenticateSuccessWithClaims), // to infiltrate a stream of actions we use tap , tap is simply an operator that takes in the data and does an operation
        tap((action)=> {
          const { roles } = action.payload.userClaims;
          if (roles.includes('ADMIN')){
            this.router.navigate(['/admin/dashboard']);
          } else {
            // Handle other roles or fallback route
            this.router.navigate(['/']);
          }
        })
      ),
      { dispatch: false } // No new action is dispatched after this effect
    )

   
  }
}
