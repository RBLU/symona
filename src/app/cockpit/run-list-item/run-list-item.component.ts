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

  private statusIconMap = {
    red: 'error',
    yellow: 'warning',
    green: 'check_circle'
  };


  constructor() {
  }

  getRunIcon(): string {
    return this.statusIconMap[this.run.runStatus];
  }

  ngOnInit() {
  }

}
