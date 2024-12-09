import { Component, Input, OnInit } from '@angular/core';
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
  styleUrls: ['./reclamations-list.component.css'],
})
export class ReclamationsListComponent implements OnInit {

  @Input() reclamationsState$!: Observable<reclamationState>;
  expandedReclamation: Reclamation | null = null;

  public STATE = STATE;
  responseForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.responseForm = this.fb.group({
      response: ['', Validators.required]
    });
  }

  toggleDetails(reclamation: Reclamation | null): void {
    this.expandedReclamation = this.expandedReclamation === reclamation ? null : reclamation;
    // Reset response form when toggling
    if (this.expandedReclamation !== reclamation) {
      this.responseForm.reset();
    }
  }

  onRespond(reclamation: Reclamation): void {
    if (this.responseForm.valid) {
      const responseMessage = this.responseForm.value.response;
      const updatedReclamation: Reclamation = {
        ...reclamation,
        reponse: responseMessage,
        status: ReclamationStatus.TRAITEE
      };
      this.store.dispatch(reclamationActions.respondReclamation({ payload: updatedReclamation }));
      this.responseForm.reset();
      this.expandedReclamation = null;
    } else {
      this.responseForm.markAllAsTouched();
    }
  }

  onRetry() {
    this.store.dispatch(reclamationActions.fetchReclamation());
  }
}