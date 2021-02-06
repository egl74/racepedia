export class StatsModel {
  name: string;
  country: string;
  wins: number;
  podiums: number;
}

export class DriverStatsModel extends StatsModel {
  driverId: string;
}

export class TeamModel extends StatsModel {
  driverRoster: StatsModel[];
  constructorId: string;

  public constructor(init?: Partial<TeamModel>) {
    super();
    Object.assign(this, init);
  }
}
