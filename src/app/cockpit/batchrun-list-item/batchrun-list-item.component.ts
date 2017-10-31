import {Component, Input, OnInit} from '@angular/core';
import {Batchrun} from "../../shared/models/batchrun";

@Component({
  selector: 'batchrun-list-item',
  templateUrl: './batchrun-list-item.component.html',
  styleUrls: ['./batchrun-list-item.component.scss']
})
export class BatchrunListItemComponent implements OnInit {

  @Input()
  run: Batchrun;

  constructor() { }

  ngOnInit() {
  }

}
