import { CircuitModel } from './circuit.model';
import { RaceResultsItem } from './race-results-item.model';

export class RaceModel {
  date: string;
  raceName: string;
  round: string;
  season: string;
  url: string;
  Circuit: CircuitModel;
  results: RaceResultsItem[];

  public constructor(init?: Partial<RaceModel>) {
    Object.assign(this, init);
  }
}
