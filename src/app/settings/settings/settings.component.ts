import { Component, OnInit } from '@angular/core';
import {MonitoringService} from "../../core/monitoring.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public monitorings$: any;

  constructor(
    private monitoringService: MonitoringService
  ) { }

  ngOnInit() {
    this.monitorings$ = this.monitoringService.getMonitorings();
  }

}
