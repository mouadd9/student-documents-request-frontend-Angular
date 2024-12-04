import { ReclamationStatus } from "./enums/reclamation-status";
import { Etudiant } from "./etudiant";

export interface Reclamation {
  id?: number;
  email?: string;
  cin?: string;
  numApogee?: string;
  sujet: string;
  message: string;
  reponse?: string | null;
  status?: ReclamationStatus;
  dateCreation?: Date;
  dateTraitement?: Date | null;
  etudiant?: Etudiant;

// in case we are fetching the demandes related to the student then associating a reclamation to a demande
// then well need a dropdown that shows all demandes 
// meaning we'll need to kinda prefetch them using the student identifiers , since there is no authenitifaction 
// we have two staged form , "identification (CIN EMAIL APPOGEE)" -> "List of demandes + reclamationMessage"
//  relatedDemandeId?: number; (in this case this field will be populated by the id of the demande chosen from the drop down)
}
