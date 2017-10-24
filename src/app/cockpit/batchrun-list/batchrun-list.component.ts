import { Component, OnInit } from '@angular/core';
import { Batchrun} from '../../batchrun';


@Component({
  selector: 'batchrun-list',
  templateUrl: './batchrun-list.component.html',
  styleUrls: ['./batchrun-list.component.scss']
})
export class BatchrunListComponent implements OnInit {

  runs: [Batchrun];

  constructor() {
    this.runs = [
      new Batchrun('123123', 'PoliceEVDrucken', new Date()),
      new Batchrun('345345', 'PoliceEVDrucken', new Date()),
      new Batchrun('456465', 'PoliceEVDrucken', new Date()),
    ]
  }

  ngOnInit() {
  }

}
