import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunListItemComponent } from './run-list-item.component';
import {MonitoringService} from "../../core/monitoring.service";
import {SharedModule} from "../../shared/shared.module";
import {MockMonitoringService, MockProvider} from "../../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {Run} from "../../core/models/run";
import {Monitoring} from "../../core/models/monitoring";

describe('RunListItemComponent', () => {
  let component: RunListItemComponent;
  let fixture: ComponentFixture<RunListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunListItemComponent ],
      imports: [ SharedModule, RouterTestingModule],
      providers: [
        {provide: MonitoringService, useClass: MockMonitoringService}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunListItemComponent);
    component = fixture.componentInstance;
    component.run = MockProvider.mockRun;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
