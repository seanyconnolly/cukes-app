import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {ThemeModule} from '../../@theme/theme.module';
import {ResultsRoutingModule, routedComponents} from './results-routing.module';
import {ResultsService} from "../../@core/data/ResultsService";

@NgModule({
  imports: [
    ThemeModule,
    ResultsRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    ResultsService
  ],
})
export class ResultsModule {
}
