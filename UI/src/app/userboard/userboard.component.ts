import { Component, ViewChildren, ElementRef, QueryList, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { take, filter, map } from 'rxjs/operators';
import { NbListItemComponent, NbLayoutScrollService, NB_WINDOW } from '@nebular/theme';
import { NewsService } from './news.service';

@Component({
  selector: 'app-userboard',
  templateUrl: './userboard.component.html',
  styleUrls: ['./userboard.component.scss'],
  providers: [ NewsService ],
})


export class UserboardComponent {

  news = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(private newsService: NewsService) {}

  loadNext() {
    if (this.loading) { return }

    this.loading = true;
    // @ts-ignore
    this.placeholders = new Array(this.pageSize);
    this.newsService.load(this.pageToLoadNext, this.pageSize)
      .subscribe(news => {
        this.placeholders = [];
        // @ts-ignore
        this.news.push(...news);
        this.loading = false;
        this.pageToLoadNext++;
      });
  }
}
