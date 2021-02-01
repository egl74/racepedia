export class RaceResultsItem {
  position: string;
  driverName: string;
  driverNationality: string;
  constructorName: string;
  result: string;

  public constructor(init?:Partial<RaceResultsItem>) {
    Object.assign(this, init);
}
}
