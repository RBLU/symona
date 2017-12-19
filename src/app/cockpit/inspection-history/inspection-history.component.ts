import {Component, ElementRef, Input, OnInit, ViewChild, OnChanges, OnDestroy} from '@angular/core';
import {Inspection} from "../../core/models/inspection";
import {D3, D3Service, Selection} from "d3-ng2-service";
import {InspectionService} from "../../core/inspection.service";
import * as moment from 'moment';

@Component({
  selector: 'inspection-history',
  templateUrl: './inspection-history.component.html',
  styleUrls: ['./inspection-history.component.scss'],
})
export class InspectionHistoryComponent implements OnInit, OnChanges {

  @Input() inspection: Inspection;
  @Input() width: number = 200;
  @Input() height: number = 500;
  @Input() margin: number = 50;

  @ViewChild('svgContainer') svgContainer: ElementRef;

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private d3viewport: Selection<SVGGElement, any, null, undefined>;
  private values: any;
  private stats: any;

  constructor(d3Service: D3Service, private inspectionService: InspectionService) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    let d3 = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    this.parentNativeElement = this.svgContainer.nativeElement;

    if (this.parentNativeElement !== null) {
      this.width  = this.parentNativeElement.offsetWidth;
      d3ParentElement = d3.select(this.parentNativeElement);

      this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

      this.d3Svg.attr('width', this.width);
      this.d3Svg.attr('height', this.height);

      this.d3viewport =
        this.d3Svg.append<SVGGElement>('g')
          .attr('transform', 'translate(' + this.margin + ',0)')
          .attr('class', 'viewport');

      if (this.d3viewport && this.values && this.stats) {
        this.render(this.values, this.stats);
      }
    }
  }

  ngOnChanges(changes) {
    if (changes['inspection'] && this.inspection) {
      this.inspectionService.getStats(this.inspection.boid)
        .combineLatest(this.inspectionService.getValues(this.inspection.boid))
        .subscribe((result) => {
          this.values = result[1];
          this.stats = result[0];
          this.render(this.values, this.stats);
        })
    }

  }


  private render(values: any[], stats: any) {
    let d3 = this.d3;
    let viewport = this.d3viewport;
    let width = this.width;
    let height = this.height - this.margin;

    let zoom = d3.zoom()
      .scaleExtent([1, 40])
      .translateExtent([[-100, 0], [this.width + 90, 0]])
      .on('zoom', zoomed);

    // clear the elements inside of the directive
    viewport.selectAll('*').remove();

    viewport.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    // set ranges (=screen dimensions) on scale functions
    let xScale = d3.scaleTime()
      .rangeRound([0, width]);

    let yScale = d3.scaleLinear()
      .rangeRound([height, 0]);

    let yScaleRects = d3.scaleLinear()
      .rangeRound([0, height]);

    // set data ranges to be displayed
    xScale.domain(d3.extent(values, function (d) {
      return new Date(d.started);
    }));

    let yExtent = d3.extent(values, function (d) {
      return d.value;
    });

    yScale.domain(yExtent);
    yScaleRects.domain(yExtent);


    // create the rects for the background color
    // 1st red one

    let levels = viewport.append('g')
      .attr('class', 'levels');

    levels.append('rect')
      .attr('x', 0)
      .attr('width', this.width)
      .attr('y', height - yScaleRects(stats.levelLowError))
      .attr('height', Math.max(0, yScaleRects(stats.levelLowError)))
      .attr('class', 'error');

    levels.append('rect')
      .attr('x', 0)
      .attr('width', width)
      .attr('y', height - yScaleRects(stats.levelLowWarning))
      .attr('height', Math.max(0, yScaleRects(stats.levelLowWarning) - yScaleRects(stats.levelLowError)))
      .attr('class', 'warning');

    levels.append('rect')
      .attr('x', 0)
      .attr('width', width)
      .attr('y', height - yScaleRects(stats.levelHighWarning))
      .attr('height', yScaleRects(stats.levelHighWarning) - Math.max(0, yScaleRects(stats.levelLowWarning)))
      .attr('class', 'normal');

    levels.append('rect')
      .attr('x', 0)
      .attr('width', width)
      .attr('y', height - yScaleRects(stats.levelHighError))
      .attr('height', yScaleRects(stats.levelHighError) - yScaleRects(stats.levelHighWarning))
      .attr('class', 'warning');

    levels.append('rect')
      .attr('x', 0)
      .attr('width', width)
      .attr('y', 0)
      .attr('height', height - Math.min(height, yScaleRects(stats.levelHighError)))
      .attr('class', 'error');

    let xAxis =
      d3.axisBottom(xScale)
        .tickSizeInner(-height);

    let yAxis = d3.axisLeft(yScale);

    viewport.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'axis xaxis');

    drawXaxis(xScale);

    viewport.append('g')
      .attr('class', 'axis yaxis')
      .call(yAxis)

      // append a small text to the yAxis showing the Kennzahl
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text(this.inspection.name);

    function zoomed() {
      let transform = d3.event.transform;
      let updatedXscale = transform.rescaleX(xScale);
      viewport.selectAll('.dot')
        .data(values)
        .attr('cx', (d) => {
          return updatedXscale(new Date(d.started));
        });

      //dots.attr('transform', 'translate(' + transform.x + ') scale( ' + transform.k+ ',1)');
      drawXaxis(updatedXscale);
    }

    function drawXaxis(scale) {
      viewport.select('.xaxis')
        .call(xAxis.scale(scale))
        .selectAll('text')
        .attr('fill', '#000')
        .attr('y', 15)
        .attr('x', 5)
        .attr('dy', '.35em')
        .attr('transform', 'rotate(45)')
        .style('text-anchor', 'start');
    }

    viewport
      .append('g')
      .attr('class', 'dots')
      .attr('clip-path', 'url(#clip)')
      .selectAll('.dot')
      .data(values)
      .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 5)
        .attr('cx', (d) => {
          return xScale(new Date(d.started));
        })
        .attr('cy', (d) => {
         return yScale(new Date(+d.value));
        })
        .append("svg:title")
          .text(d => moment(d.started).format('LLL') + ': ' + d.value)
          .on('click', function (d) {
           // $scope.$root.$state.go('batches', {batchId: d.ITSBATCHCONFIG, runId: d.ITSBATCHRUN});
          });

    viewport.call(zoom);
  }


}
