import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionListComponent } from './inspection-list.component';
import {MonitoringService} from "../../core/monitoring.service";
import {SharedModule} from "../../shared/shared.module";
import {MockMonitoringService} from "../../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {Component, Input} from "@angular/core";
import {Inspection} from "../../core/models/inspection";

describe('InspectionListComponent', () => {
  let component: InspectionListComponent;
  let fixture: ComponentFixture<InspectionListComponent>;


  @Component({
    selector: 'inspection-value',
    template: '<div>Mock Inspection-Value</div>',
    styleUrls: []
  })
  class MockInspectionValueComponent {
    @Input() inspection: Inspection;
    @Input() width: number = 200;
    @Input() height: number = 60;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionListComponent, MockInspectionValueComponent ],
      imports: [ SharedModule, RouterTestingModule],
      providers: [
        {provide: MonitoringService, useClass: MockMonitoringService}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
