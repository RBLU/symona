import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Run} from "./models/run";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';
import {Inspection} from "./models/inspection";
import {Monitoring} from "./models/monitoring";
import {Target} from "./models/target";

const QUERY_SEPARATOR = "|";

@Injectable()
export class MonitoringService {
  constructor(private http: HttpClient) {
  }

  getRuns(runStatusFilter, nameFilter, dateFilter, pageIndex, pageSize): Observable<HttpResponse<[Run]>> {
    console.log('filters: name:' + nameFilter + ', status: ' + runStatusFilter + ", date: " + dateFilter + ', paging; '+ pageIndex + '/' + pageSize );
    let url = '/runs?expand=itsMonitoring&orderBy=started' + QUERY_SEPARATOR + 'desc';

    if (runStatusFilter) {
      url += '&filter=runStatus' + QUERY_SEPARATOR + 'eq' + QUERY_SEPARATOR + runStatusFilter;
    }
    if (nameFilter) {
      url += '&filter=Monitoring.name' + QUERY_SEPARATOR + 'likei' + QUERY_SEPARATOR + nameFilter;
    }
    if (dateFilter) {
      url += '&filter=started' + QUERY_SEPARATOR + '>' + QUERY_SEPARATOR + dateFilter.toISOString();
      url += '&filter=started' + QUERY_SEPARATOR + '<' + QUERY_SEPARATOR + moment(dateFilter).add(1, 'day').toISOString();
    }
    if (pageSize) {
      url += '&limit=' +pageSize
    }
    if (pageIndex && pageIndex !== 0) {
      url += '&offset=' + (pageIndex*pageSize)
    }
    return this.http.get<[Run]>(url, {observe: 'response'});
  }

  getRunById(id: string): Observable<Run> {
    return this.http.get<Run>('/runs/' + id + '?expand=itsMonitoring');
  }

  getInspectionsForRun(boid: string): Observable<Inspection[]> {
    return this.http.get<Inspection[]>('/runs/' + boid + '/inspections?expand=itsInspectionDef');
  }

  getMonitorings() {
    return this.http.get<Monitoring[]>('/monitorings?expand=itsTarget');
  }

  getMonitoringById(boid: string | null) {
    return this.http.get<Monitoring>('/monitorings/' + boid + '?expand=itsTarget');
  }

  reloadRuns(boid: string): Observable<any> {
    return  this.http.post<{ created: number; }>('/monitorings/' + boid + '/reloadruns', null);
  }

  getInspectionsForMonitoring(boid: string): Observable<Inspection[]> {
    return this.http.get<Inspection[]>('/inspections?filter=itsMonitoring' + QUERY_SEPARATOR + 'eq' + QUERY_SEPARATOR+ boid
      + '&expand=itsInspectionDef');
  }

  recalcInspection(boid: string): Observable<any> {
    console.log('initiating http call for recalc: ' + boid);
    return  this.http.post<any>('/inspections/' + boid + '/recalc', null)
  }

  getTargets() {
    return this.http.get<Target[]>('/targets');
  }

  ignoreRun(runBoid: string, doIgnore: boolean) {
    return this.http.post<any>('/runs/' + runBoid +  (doIgnore ?'/ignore': '/unignore'), null );
  }
}
