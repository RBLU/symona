import { Component, OnInit } from '@angular/core';
import {MonitoringService} from "../../core/monitoring.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Monitoring} from "../../core/models/monitoring";

@Component({
  selector: 'monitoring-detail',
  templateUrl: './monitoring-detail.component.html',
  styleUrls: ['./monitoring-detail.component.scss']
})
export class MonitoringDetailComponent implements OnInit {

  monitoring$: Observable<Monitoring>;
  currentMonitoringBoid: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monitoringService: MonitoringService
  ) { }

  ngOnInit() {
    this.monitoring$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.currentMonitoringBoid = params.get('boid');
        return this.monitoringService.getMonitoringById(params.get('boid'));
      });
  }

}
