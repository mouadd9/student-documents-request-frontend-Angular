import { ReclamationStatus } from "./enums/reclamation-status";
import { Etudiant } from "./Etudiant";

export interface Reclamation {
  id?: number;
  email?: string;
  cin?: string;
  numApogee?: string;
  sujet: string;
  message: string;
  reponse?: string | null;
  status?: ReclamationStatus;
  dateCreation?: string | null;
  dateTraitement?: string | null;
  etudiant?: Etudiant;
}
