import { DemandeStatus } from "./enums/document-status";
import { TypeDocument } from "./enums/document-type";
import { Etudiant } from "./Etudiant";

export interface Demande {
    id?: number; 
    email?: string;
    cin?: string;
    numApogee?: string;
    typeDocument: TypeDocument;
    statut?: DemandeStatus; 
    dateCreation?: string | null;
    dateTraitement?: string | null;
    etudiant?: Etudiant;
}
