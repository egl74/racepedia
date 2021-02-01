import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BannerInfoItem } from './banner-info-item.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() bannerInfo: Observable<BannerInfoItem[]>;

  constructor() { }

  ngOnInit() {
  }

}
