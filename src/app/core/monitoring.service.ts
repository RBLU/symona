import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Run} from "./models/run";
import {Observable} from "rxjs/Rx";

@Injectable()
export class MonitoringService {

  constructor(private http: HttpClient) {
  }

  getRuns(): Observable<[Run]> {

    return Observable.timer(0, 15000)
      .switchMap(() => this.http.get<[Run]>('/runs?expand=itsMonitoring'))
  }

  getRunById(id: string): Observable<Run> {
    return this.http.get<Run>('/runs/' + id);
  }
}
