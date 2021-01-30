export class SessionResultsItem {
  position: number;
  driverName: string;
  driverNationality: string;
  constructorName: string;
  result: string;

  public constructor(init?:Partial<SessionResultsItem>) {
    Object.assign(this, init);
}
}
