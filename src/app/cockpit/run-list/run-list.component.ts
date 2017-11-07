import {Component, OnInit} from '@angular/core';
import {Run} from '../../core/models/run';
import {MonitoringService} from "../../core/monitoring.service";
import {Observable} from "rxjs/Observable";
import {FormControl} from '@angular/forms';


@Component({
  selector: 'run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent implements OnInit {

  monNamesCtrl: FormControl = new FormControl();
  runs$: Observable<[Run]>;
  currentFilter: string = '';
  filteredMonitoringNames$:  Observable<string[]>;

  constructor(public monitoringService: MonitoringService) {
    this.filteredMonitoringNames$ = this.monNamesCtrl.valueChanges
      .startWith(null)
      .debounceTime(500)
      .switchMap(filterString => filterString && filterString.length > 1 ? monitoringService.getMonitoringNames(filterString) :[]);
  }

  setFilter(filterValue) {
    this.currentFilter = filterValue;
    this.runs$ = this.monitoringService.getRuns(this.currentFilter);
  }

  ngOnInit() {
    this.runs$ = this.monitoringService.getRuns(this.currentFilter);
  }

}
