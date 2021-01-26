export class DriverStandingsItem {
    driverId: string;
    driverCode: string;
    team: string;
    points: number;
    position: number;

    public constructor(init?:Partial<DriverStandingsItem>) {
        Object.assign(this, init);
    }
}