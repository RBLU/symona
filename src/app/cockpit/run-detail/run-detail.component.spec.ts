import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunDetailComponent } from './run-detail.component';
import {MonitoringService} from "../../core/monitoring.service";
import {SharedModule} from "../../shared/shared.module";
import {MockMonitoringService} from "../../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {InspectionListComponent} from "../inspection-list/inspection-list.component";
import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

describe('RunDetailComponent', () => {
  let component: RunDetailComponent;
  let fixture: ComponentFixture<RunDetailComponent>;

  @Component({
    selector: 'inspection-list',
    template: '<div>Mock Inspection Liste</div>',
    styleUrls: []
  })
  class MockInspectionList {
    @Output() showHistory = new EventEmitter();
    @Input() runId : string;
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunDetailComponent, MockInspectionList ],
      imports: [ SharedModule, RouterTestingModule],
      providers: [
        {provide: MonitoringService, useClass: MockMonitoringService}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
