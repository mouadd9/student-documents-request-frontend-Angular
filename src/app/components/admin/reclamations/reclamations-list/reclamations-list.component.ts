import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { reclamationState } from '../../../../store/reclamations-feature/reclamations.state';
import { Reclamation } from '../../../../models/reclamation';
import { STATE } from '../../../../store/state';
import { Store } from '@ngrx/store';
import { reclamationActions } from '../../../../store/reclamations-feature/reclamations.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectReclamationState } from '../../../../store/reclamations-feature/reclamations.selectors';
import { ReclamationStatus } from '../../../../models/enums/reclamation-status';

@Component({
  selector: 'app-reclamations-list',
  templateUrl: './reclamations-list.component.html',
  styleUrl: './reclamations-list.component.css',
})
export class ReclamationsListComponent {

  @Input() reclamationsState$!: Observable<reclamationState>; // this input property will be initialized with the passed observable
  expandedReclamation: Reclamation | null = null;
  respondingReclamation: Reclamation | null = null; // This will track which reclamation is being responded to

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
    if (this.expandedReclamation && this.expandedReclamation !== this.respondingReclamation) {
      this.respondingReclamation = null;
    }
  }

  toggleResponse(reclamation: Reclamation | null): void {
    // Reset the form each time we open a new response form
    this.responseForm.reset();
    this.respondingReclamation = this.respondingReclamation === reclamation ? null : reclamation;
    // If we are responding to a different reclamation, close the details if opened for another
    if (this.respondingReclamation && this.expandedReclamation && this.expandedReclamation !== this.respondingReclamation) {
      this.expandedReclamation = null;
    }
  }

  onRespond(reclamation: Reclamation | null) {
    if (this.responseForm.valid && reclamation) {
      const responseMessage = this.responseForm.value.response;
      let updatedReclamation = {...reclamation, response:responseMessage, status: ReclamationStatus.TRAITEE}; 
      this.store.dispatch(reclamationActions.respondReclamation({payload: updatedReclamation}));
      this.responseForm.reset();
      
    } else {
      // Mark the form as touched to show validation errors if not valid
      this.responseForm.markAllAsTouched();
    }
  }

  closeResponseForm() {
    this.respondingReclamation = null;
  }
  onRetry(){
    this.store.dispatch(reclamationActions.fetchReclamation());
  }
}
