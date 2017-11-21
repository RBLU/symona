import {Component, OnInit} from '@angular/core';
import {Run} from '../../core/models/run';
import {MonitoringService} from "../../core/monitoring.service";
import {Observable} from "rxjs/Observable";
import {FormControl} from '@angular/forms';
import {Subject} from "rxjs/Subject";


@Component({
  selector: 'run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent {

  monFilterCtrl: FormControl = new FormControl();
  runs$: Observable<[Run]>;
  private statusFilterSubject = new Subject<string>();
  private statusFilter$ = this.statusFilterSubject.asObservable();

  constructor(public monitoringService: MonitoringService) {
    this.runs$ = this.monFilterCtrl.valueChanges
      .startWith('')
      .debounceTime(500)
      .distinctUntilChanged()
      .combineLatest(this.statusFilter$.startWith('').distinctUntilChanged())
      .switchMap((filters) => this.monitoringService.getRuns(filters[1], filters[0]))
  }

  setStatusFilter(filterValue) {
    this.statusFilterSubject.next(filterValue);
  }
}
