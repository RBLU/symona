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

  constructor(public monitoringService: MonitoringService) { }

  ngOnInit() {
      this.runs$ = this.monitoringService.getRuns();
  }

}
