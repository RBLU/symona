export class Inspection {

  constructor(
    public boid: string,
    public itsMonitoring: string,
    public monitoring: any,
    public itsInspectionDef: string,
    public inspection: any,
    public levelMin: number,
    public levelMax: number,
    public levelLowError: number,
    public levelLowWarning: number,
    public levelHighWarning: number,
    public levelHighError: number,
    public name: string,
    public description: string,
    public active: boolean,
    public itsRun?: string,
    public value?: number,
    public status?: string,
    public ignore?: boolean
  ) { }
}
