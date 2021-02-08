import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ConstructorStandingsItem } from 'src/app/models/constructor-standings-item.model';
import { SeasonService } from '../../services/season.service';
import { ConstructorStandingsDataSource } from './constructor-standings-datasource';


@Component({
  selector: 'app-constructor-standings',
  templateUrl: './constructor-standings.component.html',
  styleUrls: ['./constructor-standings.component.scss'],
})
export class ConstructorStandingsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<ConstructorStandingsItem>;
  @Input() season: string;
  dataSource: ConstructorStandingsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['position', 'team', 'points'];

  constructor(private readonly seasonService: SeasonService) {}

  ngOnInit() {
    this.dataSource = new ConstructorStandingsDataSource(this.seasonService, this.season);
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
