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
  @Input() height: number = 60;

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private d3G: Selection<SVGGElement, any, null, undefined>;
  private d3CaptionG: Selection<SVGGElement, any, null, undefined>;

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
      this.d3CaptionG = this.d3G.append<SVGGElement>('g');

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


    const drawRect = (left: number, right: number, cssClass: string): void => {
      d3G
        .append('rect')
        .attr('class', cssClass)
        .attr('x', x(left))
        .attr('y', 0)
        .attr('width', x(right) - x(left))
        .attr('height', this.height/3);
    };

    const drawCaption = (xPos: number, caption?: string) => {
      if (!caption) {
        caption = ''+xPos;
      }
      this.d3CaptionG
        .append('text')
        .attr('class', 'settings')
        .text(caption)
        .attr("transform", "translate("+x(xPos)+","+this.height/2 +")rotate(-45)")
        .attr('text-anchor', 'end');
    };

    // draw our 5 rects with the correct coordinates and colors
    drawRect(insp.levelMin, insp.levelLowError, 'settings error');
    drawRect(insp.levelLowError, insp.levelLowWarning, 'settings warning');
    drawRect(insp.levelLowWarning, insp.levelHighWarning, 'settings normal');
    drawRect(insp.levelHighWarning, insp.levelHighError, 'settings warning');
    drawRect(insp.levelHighError, insp.levelMax, 'settings error');

    // draw the captions on the x axis

    drawCaption( insp.levelMin);
    drawCaption(insp.levelLowError);
    drawCaption(insp.levelLowWarning);
    drawCaption(insp.levelHighWarning);
    drawCaption(insp.levelHighError);
    drawCaption(insp.levelMax);

    // draw the dot
    d3G.append('circle')
      .attr('cx', x(Math.min(Math.max(insp.value, insp.levelMin), insp.levelMax)))
      .attr('cy', this.height/6)
      .attr('r', this.height/12)
      .attr('fill', 'blue')
  }


}
