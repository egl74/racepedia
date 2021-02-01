import { CircuitModel } from './circuit.model';
import { RaceResultsItem } from './race-results-item.model';

export class RaceModel {
  date?: Date;
  raceName?: string;
  round?: string;
  season?: string;
  time?: string;
  url?: string;
  Circuit: CircuitModel;
  results: RaceResultsItem[];

  public constructor(init?: Partial<RaceModel>) {
    Object.assign(this, init);
  }
}
