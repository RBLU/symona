import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent} from "./settings/settings.component";
import {SharedModule} from "../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { MonitoringDetailComponent } from './monitoring-detail/monitoring-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    SettingsComponent,
    MonitoringDetailComponent
  ]
})
export class SettingsModule { }
