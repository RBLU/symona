import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf
} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MonitoringService} from "./monitoring.service";
import {D3Service} from 'd3-ng2-service';
import {InspectionService} from "./inspection.service";


//import { TitleComponent }    from './title.component';

@NgModule({
  imports: [CommonModule],
//  declarations: [ TitleComponent ],
//  exports:      [ TitleComponent ],
  providers: [MonitoringService, InspectionService, D3Service]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
