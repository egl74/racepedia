import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoundService } from '../round/services/round.service';
import { BannerInfoItem } from '../shared/components/banner/banner-info-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  raceResults = this.roundService.getRaceResults('current', 'last');
  bannerInfo$: Observable<BannerInfoItem[]> = this.raceResults.pipe(
    map((results) =>
      results.results.slice(0, 3).map(
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

  fastestLap$: Observable<any> = this.raceResults.pipe(
    map(
      (results) =>
        [...results.results].sort((a, b) => a.fastestLapRank - b.fastestLapRank)[0]
    )
  );

  constructor(private readonly roundService: RoundService) {}

  ngOnInit() {}
}
