export interface Statistics {
  approvedDemandes: number | null;
  rejectedDemandes: number | null;
  pendingDemandes: number | null;

  pendingReclamations: number | null;

  averageDemandesProcessingTimeDays: number | null;
  averageReclamationsProcessingTimeDays: number | null;

  // Monthly data
  monthlyLabels: string[];
  monthlyData: Record<string, number[]>; // Maps a category (e.g., "Attestations") to an array of monthly values.

  // Weekly data
  weeklyLabels: string[];
  weeklyData: Record<string, number[]>; // Maps a category (e.g., "Demandes") to an array of weekly values.
}
