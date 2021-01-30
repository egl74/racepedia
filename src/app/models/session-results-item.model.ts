export class SessionResultsItem {
  position: string;
  driverName: string;
  driverNationality: string;
  constructorName: string;
  result: string;

  public constructor(init?:Partial<SessionResultsItem>) {
    Object.assign(this, init);
}
}
