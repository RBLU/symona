import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {MonitoringDetailComponent} from "./monitoring-detail/monitoring-detail.component";

const routes: Routes = [
  { path: 'settings',
    component: SettingsComponent,
    children: [
//      {
//        path: '',
//        component: CockpitHomeComponent
//      },
      {
        path: ':boid',
        component: MonitoringDetailComponent
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
