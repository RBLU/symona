import {Inspection} from "./inspection";

export class Run {

  constructor(
    public boid: string,
    public itsMonitoring: string,
    public monitoring: any,
    public runStatus: string,
    public operatorStatus: string,
    public started: Date,
    public ended: Date,
    public ignored: boolean,
    public created_at: Date,
    public updated_at: Date,
    public inspections?: Inspection[]
  ) { }
}
