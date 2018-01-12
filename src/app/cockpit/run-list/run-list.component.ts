import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Run} from '../../core/models/run';
import {MonitoringService} from "../../core/monitoring.service";
import {Observable} from "rxjs/Rx";
import {FormControl} from '@angular/forms';
import {Subject} from "rxjs/Subject";
import {MatPaginator} from "@angular/material";


@Component({
  selector: 'run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent implements AfterViewInit{

  monFilterCtrl =  new FormControl();
  dateCtrl  = new FormControl();
  runs$: Observable<[Run]>;
  resultsLength = 0;
  private statusFilterSubject = new Subject<string>();
  private statusFilter$ = this.statusFilterSubject.asObservable();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public monitoringService: MonitoringService) {

  }

  ngAfterViewInit() {
    this.runs$ = Observable.timer(0, 60*60000)
      .combineLatest(
        this.monFilterCtrl.valueChanges.startWith('').distinctUntilChanged(),
        this.statusFilter$.startWith('').distinctUntilChanged(),
        this.dateCtrl.valueChanges.startWith(null).distinctUntilChanged(),
        this.paginator.page.startWith(null))
      .debounceTime(300)
      .switchMap((filters) => this.monitoringService.getRuns(filters[2], filters[1], filters[3], this.paginator.pageIndex, this.paginator.pageSize))
      .map((httpResponse) => {
        const totalCount = httpResponse.headers.get('X-Symona-Total-Record-Count');
        if (totalCount) {
          this.resultsLength = +totalCount;
        } else {
          this.resultsLength = httpResponse.body.length;
        }
        return httpResponse.body;
      });
  }

  setStatusFilter(filterValue) {
    this.statusFilterSubject.next(filterValue);
  }
}
