import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ResultsComponent} from './results.component';
import {ResultsTableComponent} from './results-table/results-table.component';

const routes: Routes = [{
  path: '',
  component: ResultsComponent,
  children: [{
    path: 'results-table',
    component: ResultsTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsRoutingModule {
}

export const routedComponents = [
  ResultsComponent,
  ResultsTableComponent,
];
