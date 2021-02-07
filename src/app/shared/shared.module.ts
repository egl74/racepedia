import { NgModule } from '@angular/core';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BannerComponent } from './components/banner/banner.component';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RaceTitleComponent } from './components/race-title/race-title.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
  ],
  declarations: [
    MainNavComponent,
    PageNotFoundComponent,
    BannerComponent,
    RaceTitleComponent,
  ],
  exports: [
    MainNavComponent,
    PageNotFoundComponent,
    BannerComponent,
    RaceTitleComponent,
  ]
})
export class SharedModule {}
