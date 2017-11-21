import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Run} from "./models/run";
import {Observable} from "rxjs/Rx";

@Injectable()
export class MonitoringService {
  constructor(private http: HttpClient) {
  }

  getRuns(runStatusFilter, nameFilter): Observable<[Run]> {
    let url = '/runs?expand=itsMonitoring&orderBy=started|desc';

    if (runStatusFilter) {
      url += '&filter=runStatus:eq:' + runStatusFilter;
    }
    if (nameFilter) {
      url += '&filter=Monitoring.name:likei:' + nameFilter;
    }
    return Observable.timer(0, 60000)
      .distinctUntilChanged()
      .switchMap(() => this.http.get<[Run]>(url));
  }

  getRunById(id: string): Observable<Run> {
    return this.http.get<Run>('/runs/' + id + '?expand=itsMonitoring');
  }

}
