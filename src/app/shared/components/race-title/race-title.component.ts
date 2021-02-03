import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { RaceModel } from 'src/app/models/race.model';
const { flag } = require('country-emoji');

@Component({
  selector: 'app-race-title',
  templateUrl: './race-title.component.html',
  styleUrls: ['./race-title.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RaceTitleComponent {
  @Input() race$: Observable<RaceModel>;
  flag = flag;

  constructor() { }
}
