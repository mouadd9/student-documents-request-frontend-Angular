import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { catchError, delay, map, mergeMap, Observable, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { authActions } from './auth.actions';
import { jwtDecode } from "jwt-decode";




@Injectable()
export class AuthEffects {

  fetchTokenEffect$: Observable<Action>; // when an action of type authenticate is dispatched, we will get the token

  constructor(private action$: Actions, private authService: AuthService) {
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
                    console.log("---------------HERE THE SERVICE IS CALLED USING THE ACTION'S PAYLOAD---------")
                    console.log("------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------")
                    console.log("---------------HERE THE SERVICE RETURNED A CODED TOKEN------------------")
                    console.log("------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------")
                    console.log("coded token : "+token)
                    const access_token = token['access-token'];
                    console.log("---------------HERE WE EXTRACTED THE CODED TOKEN------------------")
                    console.log("------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------")
                    console.log("extracted token : " + access_token);
                    const decodedToken = jwtDecode(access_token);
                    console.log("---------------------HERE WE DECODED THE TOKEN TO EXTRACT CLAIMS----------------------")
                    console.log("------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------")
                    console.log("decoded token : " + decodedToken);
                    console.log("decoded token's user : " + decodedToken.sub);
                    console.log("--HERE WE RETURN THE DECODED TOKEN IN THE PAYLOAD OF authenticateSuccess action--")
                    console.log("------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------")

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

   
  }
}
