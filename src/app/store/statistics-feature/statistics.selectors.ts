import { createFeatureSelector } from "@ngrx/store";
import { statisticsState } from "./statistics.state";

export const selectStatisticsState = createFeatureSelector<statisticsState>('statistics');