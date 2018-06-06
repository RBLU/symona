import { TestBed, inject } from '@angular/core/testing';

import { MonitoringService } from './monitoring.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';


describe('MonitoringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MonitoringService]
    });
  });

  it('should be created', inject([MonitoringService], (service: MonitoringService) => {
    expect(service).toBeTruthy();
  }));
});
