import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringDetailComponent } from './monitoring-detail.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {MonitoringService} from "../../core/monitoring.service";
import {MockMonitoringService} from "../../../test";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('MonitoringDetailComponent', () => {
  let component: MonitoringDetailComponent;
  let fixture: ComponentFixture<MonitoringDetailComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ MonitoringDetailComponent ],
      imports: [ SharedModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {provide: MonitoringService, useClass: MockMonitoringService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
