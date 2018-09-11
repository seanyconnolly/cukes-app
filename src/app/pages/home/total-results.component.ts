import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-total-results-pie',
  template: `
    <ngx-charts-advanced-pie-chart
      [scheme]="colorScheme"
      [results]="single">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class TotalResultsComponent implements OnDestroy {
  single = [
    {
      name: 'Pass',
      value: 87,
    },
    {
      name: 'Error',
      value: 10,
    },
    {
      name: 'Fail',
      value: 3,
    },
  ];
  colorScheme: any;
  themeSubscription: any;

  // constructor(private theme: NbThemeService) {
  //   this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
  //     const colors: any = config.variables;
  //     this.colorScheme = {
  //       domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
  //     };
  //   });
  // }

  constructor() {
     this.colorScheme = {
        domain: ['green', 'orange', 'red'],
      };
  }

  ngOnDestroy(): void {

  }
}
