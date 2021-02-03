import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BannerInfoItem } from './banner-info-item.model';
const { flag } = require('country-emoji');

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  @Input() bannerInfo: Observable<BannerInfoItem[]>;
  flag = flag;

  constructor() { }
}
