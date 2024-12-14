export interface Etudiant {
  id?: number;
  nom: string;
  email: string;
  num_apogee: string;
  cin: string;
  dateNaissance: string;  // Date of birth
  lieuNaissance: string;  // Birthplace
  nationalite: string;
  filiere: string;        // Field of study
  niveau: string;         // Education level (e.g., Bachelor's, Master's)
  anneeUniversitaire: string;  // Academic year (e.g., '2024-2025')
}
