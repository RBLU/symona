import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CockpitComponent} from "./cockpit.component";
import {MonitoringService} from "../../core/monitoring.service";
import {SharedModule} from "../../shared/shared.module";
import {MockMonitoringService} from "../../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {RunListComponent} from "../run-list/run-list.component";
import {Component} from "@angular/core";


describe('CockpitComponent', () => {
  let component: CockpitComponent;
  let fixture: ComponentFixture<CockpitComponent>;

  @Component({
    selector: 'run-list',
    template: '<div>Mock Run List</div>',
    styleUrls: []
  })
  class MockRunListComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpitComponent, MockRunListComponent ],
      imports: [ SharedModule, RouterTestingModule],
      providers: [
        {provide: MonitoringService, useClass: MockMonitoringService}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
