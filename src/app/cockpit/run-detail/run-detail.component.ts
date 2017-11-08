import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Run} from "../../core/models/run";
import {MonitoringService} from "../../core/monitoring.service";

@Component({
  selector: 'run-detail',
  templateUrl: './run-detail.component.html',
  styleUrls: ['./run-detail.component.scss']
})
export class RunDetailComponent implements OnInit {

  run$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monitoringService: MonitoringService
  ) { }

  ngOnInit() {
    this.run$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
          return this.monitoringService.getRunById(params.get('boid'));
      });
  }

}
