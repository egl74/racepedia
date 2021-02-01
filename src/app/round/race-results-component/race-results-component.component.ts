import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import { RaceResultsItem } from 'src/app/models/race-results-item.model';
import { RoundService } from 'src/app/round/services/round.service';
import { BannerInfoItem } from 'src/app/shared/components/banner/banner-info-item.model';
import { RaceResultsTableDataSource } from './race-results-table-datasource';
const { flag } = require('country-emoji');

@Component({
  templateUrl: '/race-results-component.component.html',
  styleUrls: ['./race-results-component.component.scss'],
})
export class RaceResultsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<RaceResultsItem>;
  dataSource: RaceResultsTableDataSource;
  flag = flag;
  displayedColumns = ['position', 'driverName', 'constructorName', 'result'];
  panelOpenState = false;
  race$ =
    this.route.params.pipe(
      mergeMap((params) =>
        this.roundService.getRaceResults(params.season, params.round)
      ),
      shareReplay(1)
    ) || of();

  private data = this.race$.pipe(map((race) => race.results));

  bannerInfo: Observable<BannerInfoItem[]> = this.data.pipe(
    map((results) =>
      results.slice(0, 3).map(
        (item) =>
          new BannerInfoItem({
            position: item.position,
            name: item.driverName,
            country: item.driverNationality,
            result: item.result,
          })
      )
    )
  );

  constructor(
    private readonly roundService: RoundService,
    private readonly route: ActivatedRoute
  ) {
    this.data.subscribe();
  }

  ngOnInit() {
    this.dataSource = new RaceResultsTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
