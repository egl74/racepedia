export class StatsModel {
  name: string;
  country: string;
  wins: number;
  podiums: number;
}

export class DriverStatsModel extends StatsModel {
  driverId: string;
  permanentNumber: number;

  public constructor(init?: Partial<DriverStatsModel>) {
    super();
    Object.assign(this, init);
  }
}

export class TeamModel extends StatsModel {
  driverRoster: StatsModel[];
  constructorId: string;

  public constructor(init?: Partial<TeamModel>) {
    super();
    Object.assign(this, init);
  }
}
