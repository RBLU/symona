import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule} from "../shared/shared.module";

import { BatchrunListComponent } from './batchrun-list/batchrun-list.component';
import { BatchrunListItemComponent } from './batchrun-list-item/batchrun-list-item.component';
import { MatListModule, MatToolbarModule, MatIconModule} from "@angular/material";

import { CockpitComponent } from './cockpit/cockpit.component';
import { CockpitRoutingModule} from './cockpit-routing.module';
import { CockpitHomeComponent } from './cockpit-home/cockpit-home.component';
import { BatchrunDetailComponent } from './batchrun-detail/batchrun-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CockpitRoutingModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [
    BatchrunListComponent,
    BatchrunListItemComponent,
    CockpitComponent,
    CockpitHomeComponent,
    BatchrunDetailComponent
  ],
  exports: [
    CockpitComponent
  ]
})
export class CockpitModule { }
