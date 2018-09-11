import { NgModule } from '@angular/core';

import {ThemeModule} from "../../@theme/theme.module";
import {HomeComponent} from "./home.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {TotalResultsComponent} from "./total-results.component";
import {IssuesComponent} from "./issues.component";


@NgModule({
  imports: [
    ThemeModule,
    NgxChartsModule

  ],
  declarations: [
    HomeComponent,
    TotalResultsComponent,
    IssuesComponent
  ],
  providers: [

  ],
})
export class HomeModule { }
