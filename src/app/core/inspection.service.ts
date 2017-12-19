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

 getValues(boid: string): Observable<HttpResponse<any>> {
   return this.http.get<any>('/inspections/' + boid + '/values');
 };

  getStats(boid: string): Observable<HttpResponse<any>> {
    return this.http.get<any>('/inspections/' + boid + '/stats');
  };
}
