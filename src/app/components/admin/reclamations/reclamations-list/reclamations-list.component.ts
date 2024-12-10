import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { reclamationState } from '../../../../store/reclamations-feature/reclamations.state';
import { Reclamation } from '../../../../models/reclamation';
import { STATE } from '../../../../store/state';
import { Store } from '@ngrx/store';
import { reclamationActions } from '../../../../store/reclamations-feature/reclamations.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclamationStatus } from '../../../../models/enums/reclamation-status';

@Component({
    selector: 'app-reclamations-list',
    templateUrl: './reclamations-list.component.html',
    styleUrl: './reclamations-list.component.css',
    standalone: false
})
export class ReclamationsListComponent {

  @Input() reclamationsState$!: Observable<reclamationState>; // this input property will be initialized with the passed observable
  expandedReclamation: Reclamation | null = null;

  public STATE = STATE;
  responseForm!: FormGroup;


  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize the response form with a required validator
    this.responseForm = this.fb.group({
      response: ['', Validators.required]
    });
    
  }
  toggleDetails(reclamation: Reclamation | null): void {
    this.expandedReclamation = this.expandedReclamation === reclamation ? null : reclamation;
    // If we show details for another reclamation, close the response form if open
    if (this.expandedReclamation !== reclamation) {
      this.responseForm.reset();
    }
   
  }

  onRespond(reclamation: Reclamation | null) {
    if (this.responseForm.valid && reclamation) {
      const responseMessage = this.responseForm.value.response;
      let updatedReclamation = {...reclamation, reponse:responseMessage}; 
      this.store.dispatch(reclamationActions.respondReclamation({payload: updatedReclamation}));
      this.responseForm.reset();
      
    } else {
      // Mark the form as touched to show validation errors if not valid
      this.responseForm.markAllAsTouched();
    }
  }

  onRetry(){
    this.store.dispatch(reclamationActions.fetchReclamation());
  }
}
