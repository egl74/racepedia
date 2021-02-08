export class ConstructorStandingsItem {
  position: number;
  name: string;
  nationality: string;
  points: number;

  public constructor(init?: Partial<ConstructorStandingsItem>) {
    Object.assign(this, init);
  }
}
