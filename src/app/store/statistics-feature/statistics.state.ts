import { Statistics } from "../../models/Statistics";
import { STATE } from "../state";


export interface statisticsState {
    state : STATE;
    statistics : Statistics;
    errorMessage : string
} 

const initialStatistic: Statistics = {
    approvedDemandes: 0,
    rejectedDemandes: 0,
    pendingDemandes: 0,
    approvalRate: 0.0,
    rejectionRate: 0.0,
    averageDemandesProcessingTimeDays: 0.0,
    averageReclamationsProcessingTimeDays: 0.0,
    satisfactionRate: 0.0,
  
    monthlyLabels: [],
    monthlyData: {
      Attestations: [],
      "Relevés de notes": []
    },
  
    weeklyLabels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    weeklyData: {
      Demandes: [0, 0, 0, 0, 0, 0, 0],
      Réclamations: [0, 0, 0, 0, 0, 0, 0]
    }
  };
  
export let initialStatisticState: statisticsState = {
    state : STATE.initial,
    statistics : initialStatistic,
    errorMessage : ""
}