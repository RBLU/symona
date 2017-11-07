import { Component, OnInit } from '@angular/core';
import { Run} from '../../core/models/run';
import { MonitoringService } from "../../core/monitoring.service";


@Component({
  selector: 'run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent implements OnInit {

  runs: [Run];

  constructor(public monitoringService: MonitoringService) { }

  ngOnInit() {
      this.monitoringService.getRuns().subscribe((runs) => {
        this.runs = runs;
      });
  }

}
