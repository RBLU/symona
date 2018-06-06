import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunListComponent } from './run-list.component';
import {MonitoringService} from "../../core/monitoring.service";
import {SharedModule} from "../../shared/shared.module";
import {MockMonitoringService} from "../../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {Component, Input} from "@angular/core";
import {Run} from "../../core/models/run";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('RunListComponent', () => {
  let component: RunListComponent;
  let fixture: ComponentFixture<RunListComponent>;

  @Component({
    selector: 'run-list-item',
    template: '<div>Mock Run List Item</div>',
    styleUrls: []
  })
  class MockRunListItemComponent {
    @Input() run: Run;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunListComponent, MockRunListItemComponent ],
      imports: [ SharedModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {provide: MonitoringService, useClass: MockMonitoringService}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
