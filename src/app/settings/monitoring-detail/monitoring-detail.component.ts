import {Component, OnInit} from '@angular/core';
import {MonitoringService} from "../../core/monitoring.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Monitoring} from "../../core/models/monitoring";
import {Inspection} from "../../core/models/inspection";
import {Target} from "../../core/models/target";

@Component({
  selector: 'monitoring-detail',
  templateUrl: './monitoring-detail.component.html',
  styleUrls: ['./monitoring-detail.component.scss']
})
export class MonitoringDetailComponent implements OnInit {

  monitoring: Monitoring;
  currentMonitoringBoid: string;
  loadedRunCount$: Observable<{ created: number }>;
  inspections$: Observable<Inspection[]>;
  targets: Target[];
  filteredTargets: string[];
  selectedTargetTitle: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private monitoringService: MonitoringService) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {

        this.currentMonitoringBoid = params.get('boid');
        this.inspections$ = this.monitoringService.getInspectionsForMonitoring(this.currentMonitoringBoid);

        return this.monitoringService.getMonitoringById(params.get('boid'))
      }).subscribe((next) => {
        this.monitoring = next;
        this.selectedTargetTitle = next.target.title;
      });

   this.monitoringService.getTargets().subscribe((next)=>{
     this.targets = next;
   });

  }

  reloadRuns() {
    if (this.monitoring) {
      this.loadedRunCount$ = this.monitoringService.reloadRuns(this.currentMonitoringBoid);
    }
  }

  recalcInsp(boid: string): void {
    console.log('recalc Inspections: ' + boid);
    this.monitoringService.recalcInspection(boid)
      .subscribe((next) => {
        console.log(JSON.stringify(next));
      })
    ;
  }

  onChange(text: string): void {
    if (this.targets && Array.isArray(this.targets)) {
      let foundTarget = this.targets.find((target) => target.title == text);
      if (foundTarget) {

      }


    }
  }

  filter(text : string) {
    this.filteredTargets = this.targets
      .filter((target) => target.title.toUpperCase().indexOf(text.toUpperCase()) !== -1)
      .map(target => target.title);
  }

}
