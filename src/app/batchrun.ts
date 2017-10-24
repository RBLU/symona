export class Batchrun {
  BOID: string;
  itsBatch: string;
  started: Date;

  constructor(BOID: string, itsBatch: string, started: Date) {
    this.BOID = BOID;
    this.itsBatch = itsBatch;
    this.started = started;
  }
}
