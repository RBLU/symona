import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnChanges,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {Inspection} from "../../core/models/inspection";
import {InspectionService} from "../../core/inspection.service";

import {D3Service, D3, Selection} from 'd3-ng2-service';
import {ScaleLinear} from "d3-scale";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'inspection-value',
  templateUrl: './inspection-value.component.html',
  styleUrls: ['./inspection-value.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class InspectionValueComponent implements OnInit, OnChanges {

  @Input() inspection: Inspection;
  @Input() width: number = 200;
  @Input() height: number = 60;
  @ViewChild('svgContainer') svgContainer: ElementRef;
  stats$: Observable<any>;
  public historyOpen = false;

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private d3G: Selection<SVGGElement, any, null, undefined>;
  private d3CaptionG: Selection<SVGGElement, any, null, undefined>;
  private x: ScaleLinear<number, number>;


  constructor(d3Service: D3Service, private inspectionService: InspectionService) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    let d3 = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    this.parentNativeElement = this.svgContainer.nativeElement;

    if (this.parentNativeElement !== null) {
      this.width = this.parentNativeElement.offsetWidth;
      d3ParentElement = d3.select(this.parentNativeElement);

      this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

      this.d3Svg.attr('width', this.width);
      this.d3Svg.attr('height', this.height);
      this.d3G = this.d3Svg.append<SVGGElement>('g');
      this.d3CaptionG = this.d3G.append<SVGGElement>('g');
      if (this.d3G && this.inspection) {
        this.render(this.inspection);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inspection && this.d3G && this.parentNativeElement) {
      this.render(this.inspection);
    }

    if (changes['inspection']) {
      this.stats$ = this.inspectionService.getStats(this.inspection.boid).share();
      this.stats$.subscribe((stats) => {

        // draw a small black bar for the average
        this.d3G
          .append('line')
          .attr('x1', this.x(stats.AVERAGE))
          .attr('y1', 0 + 3)
          .attr('x2', this.x(stats.AVERAGE))
          .attr('y2', this.height/3 -3)
          .attr('style', 'stroke:rgb(0,0,0);stroke-width:2');

        // draw a small black bar for the std-dev
        this.d3G
          .append('line')
          .attr('x1', this.x(stats.AVERAGE - stats.STDDEV))
          .attr('y1', this.height/6)
          .attr('x2', this.x(stats.AVERAGE +  stats.STDDEV))
          .attr('y2', this.height/6)
          .attr('style', 'stroke:rgb(0,0,0);stroke-width:2');
      });
    }
  }

  onResize(event) {
    this.width = this.parentNativeElement.offsetWidth;
    if (this.inspection) {
      this.d3Svg.attr('width', this.width);
      this.d3Svg.attr('height', this.height);
      this.render(this.inspection);
    }
  }

  public autoReset() {
    this.stats$.share().subscribe((stats)=> {
      this.inspection.levelLowError = Math.max(stats.AVERAGE - 2*stats.STDDEV, 0);
      this.inspection.levelLowWarning = Math.max(stats.AVERAGE - stats.STDDEV, 0);
      this.inspection.levelHighWarning = Math.min(stats.AVERAGE + stats.STDDEV, stats.MAX);
      this.inspection.levelHighError = Math.min(stats.AVERAGE + 2*stats.STDDEV, stats.MAX);
    });
  }

  public save() {

  }

  private render(insp: Inspection) {
    const d3 = this.d3;
    let d3G = this.d3G;

    d3G.selectAll('.settings').remove();
    let x = this.x =
      d3.scaleLinear()
        .domain([insp.levelMin, insp.levelMax])
        .range([0, this.width]);


    const drawRect = (left: number, right: number, cssClass: string): void => {
      d3G
        .append('rect')
        .attr('class', cssClass)
        .attr('x', x(left))
        .attr('y', 0)
        .attr('width', x(right) - x(left))
        .attr('height', this.height / 3);
    };

    const drawCaption = (xPos: number, caption?: string) => {
      if (!caption) {
        caption = '' + xPos;
      }
      this.d3CaptionG
        .append('text')
        .attr('class', 'settings')
        .text(caption)
        .attr("transform", "translate(" + x(xPos) + "," + this.height / 2 + ")rotate(-45)")
        .attr('text-anchor', 'end');
    };

    // draw our 5 rects with the correct coordinates and colors
    drawRect(insp.levelMin, insp.levelLowError, 'settings error');
    drawRect(insp.levelLowError, insp.levelLowWarning, 'settings warning');
    drawRect(insp.levelLowWarning, insp.levelHighWarning, 'settings normal');
    drawRect(insp.levelHighWarning, insp.levelHighError, 'settings warning');
    drawRect(insp.levelHighError, insp.levelMax, 'settings error');

    // draw the captions on the x axis

    drawCaption(insp.levelMin);
    drawCaption(insp.levelLowError);
    drawCaption(insp.levelLowWarning);
    drawCaption(insp.levelHighWarning);
    drawCaption(insp.levelHighError);
    drawCaption(insp.levelMax);

    // draw the dot
    d3G.append('circle')
      .attr('cx', x(Math.min(Math.max(insp.value, insp.levelMin), insp.levelMax)))
      .attr('cy', this.height / 6)
      .attr('r', this.height / 12)
      .attr('fill', 'blue')

  }


}
