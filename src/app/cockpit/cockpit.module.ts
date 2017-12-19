import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from "../shared/shared.module";


import {RunListComponent} from './run-list/run-list.component';
import {RunListItemComponent} from './run-list-item/run-list-item.component';
import {CockpitComponent} from './cockpit/cockpit.component';
import {CockpitRoutingModule} from './cockpit-routing.module';
import {CockpitHomeComponent} from './cockpit-home/cockpit-home.component';
import {RunDetailComponent} from './run-detail/run-detail.component';
import {HttpClientModule} from "@angular/common/http";
import {InspectionValueComponent} from './inspection-value/inspection-value.component';
import {InspectionListComponent} from './inspection-list/inspection-list.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CockpitRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    RunListComponent,
    RunListItemComponent,
    CockpitComponent,
    CockpitHomeComponent,
    RunDetailComponent,
    InspectionValueComponent,
    InspectionListComponent
  ],
  exports: [
    CockpitComponent
  ]
})
export class CockpitModule {
}
