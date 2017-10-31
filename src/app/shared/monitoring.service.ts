import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Batchrun} from "./models/batchrun";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MonitoringService {

  constructor(private http: HttpClient) {
  }

  getRuns(): Observable<[Batchrun]> {
    return this.http.get<[Batchrun]>('/batchruns');
  }

  getRunById(id: string): Observable<Batchrun> {
    return this.http.get<Batchrun>('/batchruns/' + id);
  }
}
