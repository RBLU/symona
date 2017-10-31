import { Component, OnInit } from '@angular/core';
import { Batchrun} from '../../shared/models/batchrun';
import { MonitoringService } from "../../shared/monitoring.service";


@Component({
  selector: 'batchrun-list',
  templateUrl: './batchrun-list.component.html',
  styleUrls: ['./batchrun-list.component.scss']
})
export class BatchrunListComponent implements OnInit {

  runs: [Batchrun];

  constructor(public monitoringService: MonitoringService) { }

  ngOnInit() {
      this.monitoringService.getRuns().subscribe((runs) => {
        this.runs = runs;
      });
  }

}
