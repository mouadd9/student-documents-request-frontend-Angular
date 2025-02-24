import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {statisticsState} from '../../../store/statistics-feature/statistics.state';
import {Store} from '@ngrx/store';
import {selectStatisticsState} from '../../../store/statistics-feature/statistics.selectors';
import {statisticsActions} from '../../../store/statistics-feature/statistics.actions';
import {ChartConfiguration, ChartOptions, ChartType} from 'chart.js';
import {STATE} from '../../../store/state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public STATE = STATE;
  public statisticsState$: Observable<statisticsState>;

  // these are the properties that will be given to the charts

  public monthlyChartType: ChartType = 'bar';
  public statusChartType: ChartType = 'pie';
  public weeklyChartType: ChartType = 'line';
  public monthlyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {label: "Attestations", data: [], backgroundColor: "#3b82f6"},
      {label: "Relevés de notes", data: [], backgroundColor: "#fbbf24"}
    ]
  };
  public monthlyChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {y: {beginAtZero: true}}
  };
  public statusChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ["Approuvées", "En attente", "Rejetées"],
    datasets: [
      {data: [0, 0, 0], backgroundColor: ["#28a745", "#ffc107", "#dc3545"]}
    ]
  };
  public statusChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public weeklyChartData: ChartConfiguration<'line'>['data'] = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {label: "Demandes", data: [0, 0, 0, 0, 0, 0, 0], borderColor: "#10b981", fill: false},
      {label: "Réclamations", data: [0, 0, 0, 0, 0, 0, 0], borderColor: "#f59e0b", fill: false}
    ]
  };
  public weeklyChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {y: {beginAtZero: true}}
  };


  constructor(private store: Store) {
    this.statisticsState$ = this.store.select(selectStatisticsState);
  }

  ngOnInit(): void {
    this.store.dispatch(statisticsActions.fetchStatistic());
    this.statisticsState$.subscribe({
      next: (stats) => {
        if (stats && stats.statistics) {
          const {statistics} = stats;

          // Update Monthly Chart Data by reassigning new objects:
          if (statistics.monthlyLabels && statistics.monthlyData) {
            const colors = ['#3b82f6', '#fbbf24', '#10b981', '#f59e0b'];
            this.monthlyChartData = {
              labels: [...statistics.monthlyLabels],
              datasets: Object.keys(statistics.monthlyData).map((category, index) => ({
                label: category,
                data: [...statistics.monthlyData[category]],
                backgroundColor: colors[index % colors.length]
              }))
            };
          }

          // Update Status Chart
          if (
            statistics.approvedDemandes !== null &&
            statistics.pendingDemandes !== null &&
            statistics.rejectedDemandes !== null
          ) {
            this.statusChartData = {
              labels: ["Approuvées", "En attente", "Rejetées"],
              datasets: [
                {
                  data: [
                    statistics.approvedDemandes,
                    statistics.pendingDemandes,
                    statistics.rejectedDemandes
                  ],
                  backgroundColor: ["#28a745", "#ffc107", "#dc3545"]
                }
              ]
            };
          }

          // Update Weekly Chart
          if (statistics.weeklyLabels && statistics.weeklyData) {
            const borderColors = ['#10b981', '#f59e0b', '#3b82f6', '#fbbf24'];
            this.weeklyChartData = {
              labels: [...statistics.weeklyLabels],
              datasets: Object.keys(statistics.weeklyData).map((category, index) => ({
                label: category,
                data: [...statistics.weeklyData[category]],
                borderColor: borderColors[index % borderColors.length],
                fill: false
              }))
            };
          }
        }
      }
    });
  }
}
