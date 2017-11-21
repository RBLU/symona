import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Run} from "./models/run";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';

const QUERY_SEPARATOR = "|";

@Injectable()
export class MonitoringService {
  constructor(private http: HttpClient) {
  }

  getRuns(runStatusFilter, nameFilter, dateFilter): Observable<[Run]> {
    console.log('filters: name:' + nameFilter + ', status: ' + runStatusFilter + ", date: " + dateFilter);
    let url = '/runs?expand=itsMonitoring&orderBy=started|desc';

    if (runStatusFilter) {
      url += '&filter=runStatus' + QUERY_SEPARATOR + 'eq' + QUERY_SEPARATOR + runStatusFilter;
    }
    if (nameFilter) {
      url += '&filter=Monitoring.name' + QUERY_SEPARATOR + 'likei' + QUERY_SEPARATOR + nameFilter;
    }
    if (dateFilter) {
      url += '&filter=started'+ QUERY_SEPARATOR + '>' + QUERY_SEPARATOR + dateFilter.toISOString();
      url += '&filter=started'+ QUERY_SEPARATOR + '<' + QUERY_SEPARATOR +  moment(dateFilter).add(1, 'day').toISOString();
    }
    return Observable.timer(0, 60000)
      .distinctUntilChanged()
      .switchMap(() => this.http.get<[Run]>(url));
  }

  getRunById(id: string): Observable<Run> {
    return this.http.get<Run>('/runs/' + id + '?expand=itsMonitoring');
  }

}
