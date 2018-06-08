import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {MonitoringService} from "../../core/monitoring.service";

@Component({
  selector: 'run-detail',
  templateUrl: './run-detail.component.html',
  styleUrls: ['./run-detail.component.scss']
})
export class RunDetailComponent implements OnInit {

  run$: Observable<any>;
  showHistoryBoid: string;
  currentRunBoid: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monitoringService: MonitoringService
  ) { }

  ngOnInit() {
    this.run$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
          this.currentRunBoid = params.get('boid');
          return this.monitoringService.getRunById(params.get('boid'));
      });
  }

  public onShowHistory(event) {
    if (event.boid ==  this.showHistoryBoid) {
      this.showHistoryBoid = undefined;
    } else {
      this.showHistoryBoid = event.boid;
    }
  }

  public onIgnoreChange(event) {
    this.monitoringService.ignoreRun(this.currentRunBoid, event.checked)
      .subscribe((next) => {
        console.log(JSON.stringify(next));
      })
  }

}
