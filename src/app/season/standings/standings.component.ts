import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SeasonService } from 'src/app/services/season.service';
import { DriverStandingsItem } from '../../models/driver-standings-item.model';
import { StandingsDataSource } from './standings-datasource';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<DriverStandingsItem>;
  @Input() seasonPicked: Observable<string>;
  dataSource: StandingsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['position', 'driverCode', 'team', 'points'];

  constructor(private readonly seasonService: SeasonService) {}

  ngOnInit() {
    this.dataSource = new StandingsDataSource(
      this.seasonService,
      this.seasonPicked
    );
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
