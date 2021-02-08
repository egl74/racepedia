import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SeasonService } from 'src/app/season/services/season.service';
import { DriverStandingsItem } from '../../../models/driver-standings-item.model';
import { DriverStandingsDataSource } from './driver-standings-datasource';

@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.scss'],
})
export class DriverStandingsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<DriverStandingsItem>;
  @Input() season: string;
  dataSource: DriverStandingsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['position', 'driverCode', 'team', 'points'];

  constructor(private readonly seasonService: SeasonService) {}

  ngOnInit() {
    this.dataSource = new DriverStandingsDataSource(
      this.seasonService,
      this.season
    );
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
