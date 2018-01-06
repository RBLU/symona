import {Target} from "./target";

export class Monitoring {

  constructor(
    public boid: string,
    public itsTarget: string,
    public name: string,
    public description: string,
    public fromDate: Date,
    public toDate: Date,
    public active?: boolean,
    public target?: Target,
  ) { }
}
