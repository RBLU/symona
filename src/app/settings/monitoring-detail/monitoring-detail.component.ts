import { Component, OnInit } from '@angular/core';
import {MonitoringService} from "../../core/monitoring.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Monitoring} from "../../core/models/monitoring";
import {Inspection} from "../../core/models/inspection";

@Component({
  selector: 'monitoring-detail',
  templateUrl: './monitoring-detail.component.html',
  styleUrls: ['./monitoring-detail.component.scss']
})
export class MonitoringDetailComponent implements OnInit {

  monitoring: Monitoring;
  currentMonitoringBoid: string;
  loadedRunCount$: Observable<{created: number}>;
  inspections$: Observable<Inspection[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monitoringService: MonitoringService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.currentMonitoringBoid = params.get('boid');
        this.inspections$ = this.monitoringService.getInspectionsForMonitoring(this.currentMonitoringBoid );

        return this.monitoringService.getMonitoringById(params.get('boid'));
      }).subscribe((nextVal) => {
        this.monitoring = nextVal;
    });



  }

  reloadRuns() {
    console.log('reloading Runs: ' + this.monitoring.boid);
    if (this.monitoring) {
      this.loadedRunCount$ = this.monitoringService.reloadRuns(this.monitoring.boid);
    }
  }

  recalcInsp(boid: string):void {
    console.log('recalc Inspections: ' + boid);
   this.monitoringService.recalcInspection(boid)
     .subscribe((next) => {
       console.log(JSON.stringify(next));
     })
    ;
  }
}
