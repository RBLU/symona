import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Run} from "./models/run";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MonitoringService {

  constructor(private http: HttpClient) {
  }

  getRuns(): Observable<[Run]> {
    return this.http.get<[Run]>('/runs');
  }

  getRunById(id: string): Observable<Run> {
    return this.http.get<Run>('/runs/' + id);
  }
}
