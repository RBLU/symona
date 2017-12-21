import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {Inspection} from "../../core/models/inspection";
import {MonitoringService} from "../../core/monitoring.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.scss']
})
export class InspectionListComponent implements OnChanges {

  @Output() showHistory = new EventEmitter();
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

  public onShowHist(event) {
    this.showHistory.emit(event);
  }

}
