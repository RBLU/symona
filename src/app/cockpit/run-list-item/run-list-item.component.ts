import {Component, Input, OnInit} from '@angular/core';
import {Run} from "../../core/models/run";

@Component({
  selector: 'run-list-item',
  templateUrl: './run-list-item.component.html',
  styleUrls: ['./run-list-item.component.scss']
})
export class RunListItemComponent implements OnInit {

  @Input()
  run: Run;

  constructor() { }

  ngOnInit() {
  }

}
