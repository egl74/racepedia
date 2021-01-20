import { Component } from '@angular/core';
import { SeasonService } from './services/season.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'racepedia';

  constructor() {
  }
}
