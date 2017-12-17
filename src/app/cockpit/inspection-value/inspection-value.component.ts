import {Component, OnInit, Input, ElementRef, OnChanges} from '@angular/core';
import {Inspection} from "../../core/models/inspection";
import {D3Service, D3, Selection} from 'd3-ng2-service';
import {D3DragEvent} from "d3-drag";
import {D3ZoomEvent} from "d3-zoom";
import {ScaleLinear} from "d3-scale";

@Component({
  selector: 'inspection-value',
  templateUrl: './inspection-value.component.html',
  styleUrls: ['./inspection-value.component.scss']
})
export class InspectionValueComponent implements OnInit, OnChanges {

  @Input() inspection: Inspection;
  @Input() width: number = 200;
  @Input() height: number = 50;

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private d3G: Selection<SVGGElement, any, null, undefined>;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;

    if (this.parentNativeElement !== null) {


      d3ParentElement = d3.select(this.parentNativeElement);

      this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

      this.d3Svg.attr('width', this.width);
      this.d3Svg.attr('height', this.height);
      this.d3G = this.d3Svg.append<SVGGElement>('g');

      if (this.d3G && this.inspection) {
        this.render(this.inspection);
      }
    }
  }

  ngOnChanges() {
    if (this.inspection && this.d3G) {
      this.render(this.inspection);
    }
  }



  private render(insp: Inspection) {
    const d3 = this.d3;
    let d3G = this.d3G;

    const x: ScaleLinear<number, number> =
      d3.scaleLinear()
        .domain([insp.levelMin, insp.levelMax])
        .range([0, this.width]);


    function drawRect(left: number, right: number, heigth: number, cssClass: string): void {
      d3G
        .append('rect')
        .attr('class', cssClass)
        .attr('x', left)
        .attr('y', 0)
        .attr('width', right - left)
        .attr('height', heigth);
    }

    // draw our 5 rects with the correct coordinates and colors
    drawRect(x(insp.levelMin), x(insp.levelLowError), this.height, 'settings error');
    drawRect(x(insp.levelLowError), x(insp.levelLowWarning), this.height, 'settings warning');
    drawRect(x(insp.levelLowWarning), x(insp.levelHighWarning), this.height, 'settings normal');
    drawRect(x(insp.levelHighWarning), x(insp.levelHighError), this.height, 'settings warning');
    drawRect(x(insp.levelHighError), x(insp.levelMax), this.height, 'settings error');

    // draw the dot
    d3G.append('circle')
      .attr('cx', x(Math.min(Math.max(insp.value, insp.levelMin), insp.levelMax)))
      .attr('cy', this.height/2)
      .attr('r', this.height/4)
      .attr('fill', 'blue')
  }


}
