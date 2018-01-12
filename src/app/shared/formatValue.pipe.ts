import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {DecimalPipe} from "@angular/common";

let numberPipe = new DecimalPipe('de_ch');


@Pipe({ name: 'formatvalue' })
export class FormatValuePipe implements PipeTransform {
  transform(value: any, ...args: string[]): string {
    if (typeof args === 'undefined' || args.length !== 1) {
      throw new Error('missing formatValue');
    }
    if (args[0] == 'duration') {
      return numberPipe.transform(value) + ' s';
    } else if (args[0] == 'number') {
      return numberPipe.transform(value);
    } else {
      return value;
    }
  }
}
