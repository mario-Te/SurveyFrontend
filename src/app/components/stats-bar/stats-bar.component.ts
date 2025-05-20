import { Component, Input, OnInit } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { SurveyStat } from 'src/app/data/ServiceStats';
import { SurveysService } from 'src/app/services/surveys.service';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.scss']
})
export class StatsBarComponent implements OnInit {
  @Input({ required: true }) surveyStats!: SurveyStat[]
  chartInstances: Chart[] = [];
  colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#8AFFC1', '#FF8A5C', '#A28CFF', '#7FE7DC', '#FFE26F'
  ];
  ngOnInit(): void {

    setTimeout(() => {
      this.createChartData();
    }, 0);
  }
  createChartData() {
    this.surveyStats.forEach((stat, index) => {
      if (stat.type === 'text') return; // skip text-based

      const labels = Object.keys(stat.summary);
      const data = Object.values(stat.summary).map(val => typeof val === 'number' ? val : 0);
      const canvasId = `chart-${index}`;
      const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

      if (ctx) {
        const config: ChartConfiguration = {
          type: 'pie',
          data: {
            labels,
            datasets: [{
              label: stat.question,
              data,
              backgroundColor: this.colors
            }]
          },
          options: {
            responsive: true,
            aspectRatio: 2
          }
        };
        const chart = new Chart(ctx, config);
        this.chartInstances.push(chart);
      }
    });
  }
}
