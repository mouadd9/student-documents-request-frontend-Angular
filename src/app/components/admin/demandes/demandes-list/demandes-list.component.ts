import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { STATE } from '../../../../store/state';
import { Demande } from '../../../../models/demande';

@Component({
  selector: 'app-demandes-list',
  standalone: false,
  templateUrl: './demandes-list.component.html',
  styleUrl: './demandes-list.component.css'
})


// this component will Subscribe to the demandeState Observable in its template
export class DemandesListComponent {

  // we use @Input to declare a property that will receive data from the parent component.
  // in our case demandeState$ (located in demandes-list) will receive an Observable<demandeState>; from (demandeComponent) 
  // this variable will be subscribed to in this template using <ng-container></ng-container>
  @Input() demandeState$!: Observable<{
    demandes: Demande[];
    state: STATE;
    errorMessage: string;
  }> ;

  constructor() {}

  ngOnInit(): void {
  }
 
}



/*
Un rappel : 
the @Input decorator is used to pass data from a parent component to a child component.
1 - We use @Input to declare a property that will receive data from the parent component.
2 - Bind to the child component's @Input property using property binding ([]) in the parent component's template.
*/
