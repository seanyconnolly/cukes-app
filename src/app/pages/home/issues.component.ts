import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-issues-pie',
  template: `
    <ngx-charts-advanced-pie-chart
      [scheme]="colorScheme"
      [results]="single">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class IssuesComponent implements OnDestroy {
  single = [
    {
      name: 'UI',
      value: 1,
    },
    {
      name: 'Data',
      value: 1,
    },
    {
      name: 'Unknown',
      value: 2,
    },
  ];
  colorScheme: any;

  constructor() {
    this.colorScheme = {
      domain: ['blue', 'orange', 'grey'],
    };
  }

  ngOnDestroy(): void {
  }
}
