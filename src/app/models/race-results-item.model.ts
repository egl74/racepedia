export class RaceResultsItem {
  position: string;
  driverId: string;
  driverName: string;
  driverNationality: string;
  constructorName: string;
  result: string;
  grid: number;
  stops: number;
  fastestLapRank: number;
  fastestLapTime: string;

  public constructor(init?: Partial<RaceResultsItem>) {
    Object.assign(this, init);
  }
}
