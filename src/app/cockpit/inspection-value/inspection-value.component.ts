import {Component, OnInit, Input} from '@angular/core';
import {Inspection} from "../../core/models/inspection";

@Component({
  selector: 'inspection-value',
  templateUrl: './inspection-value.component.html',
  styleUrls: ['./inspection-value.component.scss']
})
export class InspectionValueComponent implements OnInit {

  @Input() inspection: Inspection;

  constructor() {
  }

  ngOnInit() {

  }

/*
  private render(kz) {
    g.selectAll('*').remove();

    let stats = kz.kzstat;
    let run = kz.runstat;
    let low = _.isNumber(stats.LEVELMIN) ? stats.LEVELMIN : stats.MIN;
    let high = Math.max(_.isNumber(stats.LEVELMAX) ? stats.LEVELMAX : stats.MAX, stats.LEVELHIGHWARNING);

    let xScale = d3.scaleLinear()
      .domain([low, high])
      .range([0, width - (offset * 2)]);

    // add the max value of our data to the settings array, so we can draw the
    // last red rect from the last settings value to the max value
    let settingsArray = [stats.LEVELLOWERROR, stats.LEVELLOWWARNING, stats.LEVELNORMAL, stats.LEVELHIGHWARNING, stats.LEVELMAX || stats.MAX];

    g.selectAll('rect .settings')
      .data(settingsArray)
      .enter()
      .append('rect')
      .attr('class', function (d, i) {
        if (i == 0 || i == 4) {
          return 'settings error';
        } else if (i == 2) {
          return 'settings normal';
        } else {
          return 'settings warning';
        }
      })
      .attr('x', (d, i) => {
        if (i == 0) {
          return 0;
        } else {
          return xScale(Math.min(settingsArray[i - 1], high));
        }
      })
      .attr('y', (d, i) => {
        return 0;
      })
      .attr('width', (d, i) => {
        if (i == 0) {
          return xScale(d);
        } else {
          return xScale(d - settingsArray[i - 1]);
        }
      })
      .attr('height', (d, i) => {
        return 30;
      });
  }
*/


}
