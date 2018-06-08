// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {Observable} from "rxjs/Observable";
import {Run} from "./app/core/models/run";
import {Inspection} from "./app/core/models/inspection";
import {Monitoring} from "./app/core/models/monitoring";
import {Target} from "./app/core/models/target";

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare const __karma__: any;
declare const require: any;

export class MockProvider {
  public static mockTarget = new Target('targetId', 'target Title', 'target Type', 'syrBatchId');
  public static mockMonitoring = new Monitoring('id', '456', 'MonitoringName',
    'desc', new Date(), new Date(), true, MockProvider.mockTarget);

  public static mockRun= new Run('id', '123', MockProvider.mockMonitoring, 'open',
    'open', new Date(), new Date(), 0, new Date(), new Date());

  public static mockInspection = new Inspection('id', '234', MockProvider.mockMonitoring, '345',
    null, 1234, 345, 0, 12, 23,
    45, 'My Name', 'desc', true, 'runid', 324, 'open',
    false, {formatValue: 'format'});
}

export class MockMonitoringService {

  getTargets() {
    return Observable.of([MockProvider.mockTarget]);
  }
  getInspectionsForRun() {
    return Observable.of([MockProvider.mockInspection]);
  }
  getMonitorings() {
    return Observable.of([MockProvider.mockMonitoring]);
  }

  getMonitoringById() {
    return Observable.of(MockProvider.mockMonitoring);
  }

  getRunById() {
    return Observable.of(MockProvider.mockRun);
  }

  getInspectionsForMonitoring() {
    return Observable.of([MockProvider.mockInspection]);
  }
}

export class MockInspectionService {

}

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
