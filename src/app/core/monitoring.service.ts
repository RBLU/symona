import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Run} from "./models/run";
import {Observable} from "rxjs/Rx";

@Injectable()
export class MonitoringService {

  constructor(private http: HttpClient) {
  }

  getRuns(filter): Observable<[Run]> {
    let url = '/runs?expand=itsMonitoring&orderBy=started|desc';

    if (filter) {
      url += '&filter=runStatus$eq$' + filter;
    }
    return Observable.timer(0, 60000)
      .switchMap(() => this.http.get<[Run]>(url))
  }

  getRunById(id: string): Observable<Run> {
    return this.http.get<Run>('/runs/' + id + '?expand=itsMonitoring');
  }

  getMonitoringNames(filterString: string): Observable<string[]> {
    return this.http.get<string[]>('/runs/monitoringnames?filter='+ filterString);
  }

}
