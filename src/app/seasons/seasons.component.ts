import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { RaceModel } from '../models/race.model';
import { SeasonService } from '../services/season.service';
import { SeasonsDataSource } from './seasons-datasource';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent implements AfterViewInit {
  @ViewChild(MatTable) table: MatTable<RaceModel>;
  dataSource: SeasonsDataSource;

  constructor(private readonly seasonService: SeasonService) {
    this.dataSource = new SeasonsDataSource(this.seasonService);
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['round', 'race', 'circuit'];

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
