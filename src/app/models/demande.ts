import { DemandeStatus } from "./enums/document-status";
import { DocumentType } from "./enums/document-type";

export interface Demande {
    id?: number; 
    email: string;
    cin: string;
    apogeeNumber: string;
    documentType: DocumentType;
    status?: DemandeStatus; 
    submissionDate?: Date;
}
