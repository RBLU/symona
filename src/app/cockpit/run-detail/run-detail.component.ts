import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import "rxjs/add/operator/map";

@Component({
  selector: 'run-detail',
  templateUrl: './run-detail.component.html',
  styleUrls: ['./run-detail.component.scss']
})
export class RunDetailComponent implements OnInit {

  runId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .map((params: ParamMap) =>
        params.get('boid'))
      .subscribe(boid => {console.log('hello: ' + boid); this.runId = boid});
  }

}
