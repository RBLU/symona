import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Inspection} from "../../core/models/inspection";
import {MonitoringService} from "../../core/monitoring.service";
import {ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.scss']
})
export class InspectionListComponent implements OnChanges {

  @Input() runId : string;
  inspections$: Observable<Inspection[]>;


  constructor(
    private monitoringService: MonitoringService
  ) { }

  ngOnChanges() {
    if (this.runId) {
      this.inspections$ = this.monitoringService.getInspectionsForRun(this.runId);
    }
  }

}
