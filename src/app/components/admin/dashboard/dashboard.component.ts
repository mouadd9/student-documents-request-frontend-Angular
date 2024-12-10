import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { statisticsState } from '../../../store/statistics-feature/statistics.state';
import { Store } from '@ngrx/store';
import { selectStatisticsState } from '../../../store/statistics-feature/statistics.selectors';
import { statisticsActions } from '../../../store/statistics-feature/statistics.actions';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public statisticsState$: Observable<statisticsState>;

  // Set the ChartType directly without 'as ChartType'
  public monthlyChartType: ChartType = 'bar';
  public statusChartType: ChartType = 'pie';
  public weeklyChartType: ChartType = 'line';

  public monthlyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ["Mar", "Avr", "Mai", "Juin"],
    datasets: [
      { label: "Attestations", data: [20, 30, 40, 50], backgroundColor: "#3b82f6" },
      { label: "Relevés de notes", data: [15, 25, 35, 45], backgroundColor: "#fbbf24" }
    ]
  };
  public monthlyChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } }
  };

  public statusChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ["Approuvées", "En attente", "Rejetées"],
    datasets: [
      { data: [57, 31, 11], backgroundColor: ["#28a745", "#ffc107", "#dc3545"] }
    ]
  };
  public statusChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  public weeklyChartData: ChartConfiguration<'line'>['data'] = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    datasets: [
      { label: "Demandes", data: [20, 25, 30, 28, 35], borderColor: "#10b981", fill: false },
      { label: "Réclamations", data: [5, 8, 17, 13, 10], borderColor: "#f59e0b", fill: false }
    ]
  };
  public weeklyChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } }
  };

  constructor(private store: Store) {
    this.statisticsState$ = this.store.select(selectStatisticsState);
  }

  ngOnInit(): void {
    this.store.dispatch(statisticsActions.fetchStatistic());

    this.statisticsState$.subscribe({
      next: (stats) => {
        if (stats && stats.statistics) {
          const { statistics } = stats;

          // Update Monthly Chart
          if (statistics.monthlyLabels && statistics.monthlyData) {
            this.monthlyChartData.labels = statistics.monthlyLabels;
            this.monthlyChartData.datasets = Object.keys(statistics.monthlyData).map((category, index) => {
              const colors = ['#3b82f6', '#fbbf24', '#10b981', '#f59e0b'];
              return {
                label: category,
                data: statistics.monthlyData[category],
                backgroundColor: colors[index % colors.length]
              };
            });
          }

          // Update Status Chart
          if (
            statistics.approvedDemandes !== null &&
            statistics.pendingDemandes !== null &&
            statistics.rejectedDemandes !== null
          ) {
            this.statusChartData.datasets[0].data = [
              statistics.approvedDemandes,
              statistics.pendingDemandes,
              statistics.rejectedDemandes
            ];
          }

          // Update Weekly Chart
          if (statistics.weeklyLabels && statistics.weeklyData) {
            this.weeklyChartData.labels = statistics.weeklyLabels;
            this.weeklyChartData.datasets = Object.keys(statistics.weeklyData).map((category, index) => {
              const borderColors = ['#10b981', '#f59e0b', '#3b82f6', '#fbbf24'];
              return {
                label: category,
                data: statistics.weeklyData[category],
                borderColor: borderColors[index % borderColors.length],
                fill: false
              };
            });
          }
        }
      }
    });
  }
}
