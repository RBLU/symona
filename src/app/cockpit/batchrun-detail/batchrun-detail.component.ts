import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Component({
  selector: 'batchrun-detail',
  templateUrl: './batchrun-detail.component.html',
  styleUrls: ['./batchrun-detail.component.scss']
})
export class BatchrunDetailComponent implements OnInit {

  batchRunId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .map((params: ParamMap) =>
        params.get('id'))
      .subscribe(id => {console.log('hello: ' + id); this.batchRunId = id});
  }

}
