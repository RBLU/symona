import { Component, OnInit, Input } from '@angular/core';
import {Inspection} from "../../core/models/inspection";

@Component({
  selector: 'inspection-value',
  templateUrl: './inspection-value.component.html',
  styleUrls: ['./inspection-value.component.scss']
})
export class InspectionValueComponent implements OnInit {

  @Input() inspection: Inspection;
  constructor() { }

  ngOnInit() {

  }

}
