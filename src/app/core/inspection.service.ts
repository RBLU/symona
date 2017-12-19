import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Run} from "./models/run";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';
import {Inspection} from "./models/inspection";

const QUERY_SEPARATOR = "|";

@Injectable()
export class InspectionService {
  constructor(private http: HttpClient) {
  }

  getRuns(runStatusFilter, nameFilter, dateFilter, pageIndex, pageSize): Observable<HttpResponse<[Run]>> {
    console.log('filters: name:' + nameFilter + ', status: ' + runStatusFilter + ", date: " + dateFilter + ', paging; '+ pageIndex + '/' + pageSize );
    let url = '/runs?expand=itsInspection&orderBy=started' + QUERY_SEPARATOR + 'desc';

    if (runStatusFilter) {
      url += '&filter=runStatus' + QUERY_SEPARATOR + 'eq' + QUERY_SEPARATOR + runStatusFilter;
    }
    if (nameFilter) {
      url += '&filter=Inspection.name' + QUERY_SEPARATOR + 'likei' + QUERY_SEPARATOR + nameFilter;
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
    return this.http.get<Run>('/runs/' + id + '?expand=itsInspection');
  }

  getInspectionsForRun(boid: string): Observable<Inspection[]> {
    return this.http.get<Inspection[]>('/runs/' + boid + '/inspections');
  }

  getStats(boid: string): Observable<HttpResponse<any>> {
    return this.http.get<any>('/inspections/' + boid + '/stats');
  }
}
