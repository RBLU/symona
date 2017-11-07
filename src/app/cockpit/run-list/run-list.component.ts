import { Component, OnInit } from '@angular/core';
import { Run} from '../../core/models/run';
import { MonitoringService } from "../../core/monitoring.service";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent implements OnInit {

  runs$: Observable<[Run]>;
  currentFilter: string = '';

  constructor(public monitoringService: MonitoringService) { }

  setFilter(filterValue) {
    this.currentFilter = filterValue;
    this.runs$ = this.monitoringService.getRuns(this.currentFilter);
  }
  ngOnInit() {
      this.runs$ = this.monitoringService.getRuns(this.currentFilter);
  }

}
